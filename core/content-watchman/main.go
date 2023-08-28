// TODO - Add a flags
// TODO - Add a config file
// TODO - Why do the logs not work in /helpers?
// TODO - Create disturbed binary

package main

import (
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"strings"

	"github.com/fsnotify/fsnotify"
)

var relativePathToContent string = "../../content"
var changesBeforeCommit int = 5

var useDebug bool = false
var eventCounter int = 0

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
		cmd := exec.Command(commitScriptPath)
		err := cmd.Run()
		if err != nil {
			printErr(err)
		}
		fmt.Println("[INFO] Code committed and pushed successfully.")
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

				if useDebug {
					fmt.Println("[DEBUG] Event:", event.Op.String(), relPath)
				}

				if event.Op&fsnotify.Write == fsnotify.Write ||
					event.Op&fsnotify.Remove == fsnotify.Remove ||
					event.Op&fsnotify.Rename == fsnotify.Rename ||
					event.Op&fsnotify.Create == fsnotify.Create {
					eventCounter++
					fmt.Println("[INFO] Event count:", eventCounter)
					commitIfCounterReached(originalExecDir)
				}

				if event.Op&fsnotify.Create == fsnotify.Create {
					// if new directory is created, add it to watcher
					fileInfo, err := os.Stat(event.Name)
					if err != nil {
						printErr(err)
					} else if fileInfo.IsDir() {
						watcher.Add(event.Name)
						logMessage := "[INFO] Added to watch list: " + event.Name
						clipString(logMessage, 50)
					}
				}
			case err := <-watcher.Errors:
				printErr(err)
			}
		}
	}()

	// init watcher
	dirCount := watchDir(contentDir, watcher)
	fmt.Println("[INFO] Watching:", dirCount, "directories for changes")

	<-done

}
