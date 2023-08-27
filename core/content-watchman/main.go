package main

import (
	"fmt"
	"os"
	"path/filepath"

	"github.com/fsnotify/fsnotify"
)

var relativePathToContent string = "../../content"

func readCurrentDir() string {
	// Change directory
	if err := os.Chdir(relativePathToContent); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	// Get new directory
	dir, err := os.Getwd()

	if err != nil {
		fmt.Println(err)
		os.Exit(1)
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

func printErr(err error) {
	fmt.Println("Error: ", err)
	os.Exit(1)
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

			logMessage := "[INFO] Added to watch list: " + path
			clipString(logMessage, 50)
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
				// fmt.Println("Event: ", event)
				path := filepath.Base(event.Name)

				fmt.Println("Path: ", path)
				if event.Op&fsnotify.Write == fsnotify.Write {
					logMessage := "[INFO] Modified file: " + path
					clipString(logMessage, 50)
				}
				if event.Op&fsnotify.Remove == fsnotify.Remove {
					logMessage := "[INFO] Removed file: " + path
					clipString(logMessage, 50)
				}
				if event.Op&fsnotify.Rename == fsnotify.Rename {
					logMessage := "[INFO] Renamed file: " + path
					clipString(logMessage, 50)
				}
				if event.Op&fsnotify.Create == fsnotify.Create {
					logMessage := "[INFO] Created file: " + path
					clipString(logMessage, 50)

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
