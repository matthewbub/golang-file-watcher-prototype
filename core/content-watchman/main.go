package main

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"github.com/9mbs/ucan/core/content-watchman/helpers"
	"github.com/fsnotify/fsnotify"
)

var relativePathToContent string = "../../content"
var changesBeforeCommit int = 5
var commitMessage string = "[Auto Commit] Updated content"
var branchName string = "auto-commit" + helpers.FormatTimeStamp()
var useDebug bool = false

func printErr(err error) {
	fmt.Println("[ERROR]", err)
	os.Exit(1)
}

func readCurrentDir() string {
	// Change directory
	if err := os.Chdir(relativePathToContent); err != nil {
		fmt.Println(err)
		os.Exit(1)
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

				if event.Op&fsnotify.Write == fsnotify.Write {
					helpers.CommitAndPushAsBot(branchName, commitMessage)
				}
				if event.Op&fsnotify.Remove == fsnotify.Remove {
					helpers.CommitAndPushAsBot(branchName, commitMessage)
				}
				if event.Op&fsnotify.Rename == fsnotify.Rename {
					helpers.CommitAndPushAsBot(branchName, commitMessage)
				}
				if event.Op&fsnotify.Create == fsnotify.Create {
					helpers.CommitAndPushAsBot(branchName, commitMessage)

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
