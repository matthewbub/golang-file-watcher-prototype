package main

import (
	"bytes"
	"fmt"
	"log"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"time"

	"github.com/adrg/frontmatter"
	"github.com/fsnotify/fsnotify"
	"github.com/gomarkdown/markdown"
)

const (
	relativePathToContent = "../../content"
)

// LogInfo logs an informational message with a timestamp.
func LogInfo(message string) {
	log.Printf("[INFO] %s\n", message)
}

// LogError logs an error message with a timestamp and terminates the program.
func LogError(err error) {
	log.Fatalf("[ERROR] %v\n", err)
}

// readCurrentDir reads the current directory and returns the absolute path.
// The current directory is the directory where the executable is located.
// Example:
//
//	readCurrentDir()
//	=> "/home/user/website/core/content-watchman"
func readCurrentDir() string {
	// Change directory
	if err := os.Chdir(relativePathToContent); err != nil {
		LogError(err)
	}

	// Get new directory
	dir, err := os.Getwd()

	if err != nil {
		LogError(err)
	}

	return dir
}

// clipAbsolutePathToContentDir removes the absolute path to the content directory
// from the given absolute path.
// Example:
//
//	clipAbsolutePathToContentDir("/home/user/website/content/blog/2021-01-01.md", "/home/user/website/content")
//	=> "blog/2021-01-01.md"
func clipAbsolutePathToContentDir(absPath string, contentDir string) string {
	// Make sure contentDir ends with a trailing slash
	if !strings.HasSuffix(contentDir, "/") {
		contentDir += "/"
	}
	return strings.TrimPrefix(absPath, contentDir)
}

// runCommitScript executes a shell script.
// The shell script is located in the scripts directory.
// Example:
//
//	runCommitScript("bot-commit-file-added.sh")
func runCommitScript(scriptName string) {
	originalExecDir, _ := os.Getwd()

	commitScriptPath := filepath.Join(originalExecDir, "../core/content-watchman/scripts", scriptName)

	// execute shell script
	cmd := exec.Command("sh", commitScriptPath)
	err := cmd.Run()
	if err != nil {
		LogError(err)
	}
	LogInfo("Code committed successfully.")
}

// watchDir traverses the given directory and adds all subdirectories to watcher
// returns the number of directories added to watcher
// Example:
//
//	watchDir("/home/user/website/content", watcher)
func watchDir(path string, watcher *fsnotify.Watcher) int {
	dirCount := 0

	filepath.Walk(path, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			LogError(err)
		}

		if info.IsDir() {
			err := watcher.Add(path)
			if err != nil {
				LogError(err)
			}

			dirCount++
		}
		return nil
	})
	return dirCount
}

// convertFileContentsMdToHTML converts the contents of a markdown file to HTML.
// Example:
//
//	convertFileContentsMdToHTML("/home/user/website/content/blog/2021-01-01.md")
func convertFileContentsMdToHTML(filePath string) string {
	content, err := os.ReadFile(filePath)
	if err != nil {
		LogError(err)
	}

	// Define a variable to hold the front matter
	var fm map[string]interface{}

	// Parse front matter
	body, err := frontmatter.Parse(bytes.NewReader(content), &fm)
	if err != nil {
		LogError(err)
	}

	fmt.Println("Front Matter:", fm)

	return string(markdown.ToHTML([]byte(body), nil, nil))
}

func main() {
	var contentDir = readCurrentDir()

	watcher, err := fsnotify.NewWatcher()
	if err != nil {
		LogError(err)
	}

	defer watcher.Close()

	done := make(chan bool)

	go func() {
		for {
			select {
			case event := <-watcher.Events:
				relPath := clipAbsolutePathToContentDir(event.Name, contentDir)
				timestamp := time.Now().Format("01/02/2006 15:04")

				if event.Op&fsnotify.Write == fsnotify.Write {
					LogInfo(fmt.Sprintf("File modified at: %s - %s", timestamp, relPath))
					runCommitScript("bot-commit-file-updated.sh")

					content := convertFileContentsMdToHTML(event.Name)
					fmt.Println("Content of modified file:", content)
				}

				if event.Op&fsnotify.Remove == fsnotify.Remove {
					LogInfo(fmt.Sprintf("File removed at: %s - %s", timestamp, relPath))
					runCommitScript("bot-commit-file-removed.sh")
				}

				if event.Op&fsnotify.Rename == fsnotify.Rename {
					LogInfo(fmt.Sprintf("File renamed at: %s - %s", timestamp, relPath))
					runCommitScript("bot-commit-file-renamed.sh")

					content := convertFileContentsMdToHTML(event.Name)
					fmt.Println("Content of renamed file:", content)
				}

				if event.Op&fsnotify.Create == fsnotify.Create {
					// if new directory is created, add it to watcher
					fileInfo, err := os.Stat(event.Name)
					if err != nil {
						LogError(err)
					} else if fileInfo.IsDir() {
						watcher.Add(event.Name)
						LogInfo(fmt.Sprintf("Added to watch list: %s", event.Name))
					}

					LogInfo(fmt.Sprintf("File created at: %s - %s", timestamp, relPath))
					runCommitScript("bot-commit-file-added.sh")

					content := convertFileContentsMdToHTML(event.Name)
					fmt.Println("Content of created file:", content)
				}
			case err := <-watcher.Errors:
				LogError(err)
			}
		}
	}()

	// init watcher
	dirCount := watchDir(contentDir, watcher)
	LogInfo(fmt.Sprintf("Watching: %d directories for changes", dirCount))

	<-done
}
