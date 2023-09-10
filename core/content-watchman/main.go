package main

import (
	"fmt"
	"log"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"time"

	"github.com/fsnotify/fsnotify"
	"github.com/gomarkdown/markdown"
)

const (
	relativePathToContent = "../../content"
)

var (
	useDebug     bool
	eventCounter int
)

// LogInfo logs an informational message with a timestamp.
func LogInfo(message string) {
	log.Printf("[INFO] %s\n", message)
}

// LogError logs an error message with a timestamp and terminates the program.
func LogError(err error) {
	log.Fatalf("[ERROR] %v\n", err)
}

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

func clipAbsolutePathToContentDir(absPath string, contentDir string) string {
	// Make sure contentDir ends with a trailing slash
	if !strings.HasSuffix(contentDir, "/") {
		contentDir += "/"
	}
	return strings.TrimPrefix(absPath, contentDir)
}

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

// traverse directory and add all subdirectories to watcher
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

func convertFileContentsMdToHTML(filePath string) string {
	content, err := os.ReadFile(filePath)
	if err != nil {
		LogError(err)
	}

	return string(markdown.ToHTML(content, nil, nil))
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
