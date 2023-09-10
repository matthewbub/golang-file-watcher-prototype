// TODO - Add a flags
// TODO - Add a config file
// TODO - Why do the logs not work in /helpers?
// TODO - Create disturbed binary

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
)

var relativePathToContent string = "../../content"
var changesBeforeCommit int = 5

var useDebug bool = false
var eventCounter int = 0

// LogInfo logs an informational message with a timestamp.
func LogInfo(message string) {
	log.Printf("[INFO] %s\n", message)
}

// LogError logs an error message with a timestamp and terminates the program.
func LogError(err error) {
	log.Fatalf("[ERROR] %v\n", err)
}

func printErr(err error) {
	fmt.Println("[ERROR]", err)
	os.Exit(1)
}

func readCurrentDir() string {
	// Change directory
	if err := os.Chdir(relativePathToContent); err != nil {
		printErr(err)
	}

	// Get new directory
	dir, err := os.Getwd()

	if err != nil {
		printErr(err)
	}

	return dir
}

func clipString(s string, max int) {
	if len(s) > max {
		fmt.Println(s[:max], "...")
		return
	}
	fmt.Println(s)
	return
}

func clipAbsolutePathToContentDir(absPath string, contentDir string) string {
	// Make sure contentDir ends with a trailing slash
	if !strings.HasSuffix(contentDir, "/") {
		contentDir += "/"
	}
	return strings.TrimPrefix(absPath, contentDir)
}

func commitIfCounterReached(originalExecDir string) {
	commitScriptPath := filepath.Join(originalExecDir, "commit.sh")

	if eventCounter >= changesBeforeCommit {
		// execute shell script @ ./commit.sh
		cmd := exec.Command("sh", commitScriptPath)
		err := cmd.Run()
		if err != nil {
			printErr(err)
		}
		fmt.Println("[INFO] Code committed successfully.")
		eventCounter = 0 // Reset the counter
	}
}

// traverse directory and add all subdirectories to watcher
func watchDir(path string, watcher *fsnotify.Watcher) int {
	dirCount := 0

	filepath.Walk(path, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			printErr(err)
		}

		if info.IsDir() {
			err := watcher.Add(path)
			if err != nil {
				printErr(err)
			}

			dirCount++
		}
		return nil
	})
	return dirCount
}

func main() {
	originalExecDir, _ := os.Getwd()
	var contentDir = readCurrentDir()

	watcher, err := fsnotify.NewWatcher()
	if err != nil {
		printErr(err)
	}

	defer watcher.Close()

	done := make(chan bool)

	go func() {
		for {
			select {
			case event := <-watcher.Events:
				relPath := clipAbsolutePathToContentDir(event.Name, contentDir)

				if event.Op&fsnotify.Write == fsnotify.Write {
					timestamp := time.Now().Format("01/02/2006 15:04")
					LogInfo(fmt.Sprintf("File modified at: %s - %s", timestamp, relPath))

					commitScriptPath := filepath.Join(originalExecDir, "scripts/bot-commit-file-updated.sh")

					// execute shell script @ ./scripts/bot-commit-file-updated.sh
					cmd := exec.Command("sh", commitScriptPath)
					err := cmd.Run()
					if err != nil {
						LogError(err)
					}
					LogInfo("Code committed successfully.")
				}

				if event.Op&fsnotify.Remove == fsnotify.Remove {
					timestamp := time.Now().Format("01/02/2006 15:04")
					LogInfo(fmt.Sprintf("File removed at: %s - %s", timestamp, relPath))

					commitScriptPath := filepath.Join(originalExecDir, "scripts/bot-commit-file-removed.sh")

					// execute shell script @ ./scripts/bot-commit-file-removed
					cmd := exec.Command("sh", commitScriptPath)
					err := cmd.Run()
					if err != nil {
						LogError(err)
					}
					LogInfo("Code committed successfully.")
				}

				if event.Op&fsnotify.Rename == fsnotify.Rename {

					timestamp := time.Now().Format("01/02/2006 15:04")
					LogInfo(fmt.Sprintf("File renamed at: %s - %s", timestamp, relPath))

					commitScriptPath := filepath.Join(originalExecDir, "scripts/bot-commit-file-renamed.sh")

					// execute shell script @ ./scripts/bot-commit-file-renamed
					cmd := exec.Command("sh", commitScriptPath)
					err := cmd.Run()
					if err != nil {
						LogError(err)
					}
					LogInfo("Code committed successfully.")
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

					timestamp := time.Now().Format("01/02/2006 15:04")
					LogInfo(fmt.Sprintf("File created at: %s - %s", timestamp, relPath))
					commitScriptPath := filepath.Join(originalExecDir, "scripts/bot-commit-file-created.sh")

					// execute shell script @ ./scripts/bot-commit-file-created
					cmd := exec.Command("sh", commitScriptPath)
					err = cmd.Run()
					if err != nil {
						LogError(err)
					}
					LogInfo("Code committed successfully.")
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
