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

func clipString(s string, max int) string {
	if len(s) > max {
		return s[:max]
	}
	return s
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

			fmt.Println("[INFO] Added: ", path+" to watch list")
			dirCount++
		}
		return nil
	})
	return dirCount
}

func main() {
	var contentDir = readCurrentDir()
	// fmt.Println("Watching directory: ", contentDir)

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
					fmt.Println("Modified file: ", path)
				}
				if event.Op&fsnotify.Remove == fsnotify.Remove {
					fmt.Println("Removed file: ", path)
				}
				if event.Op&fsnotify.Rename == fsnotify.Rename {
					fmt.Println("Renamed file: ", path)
				}
				if event.Op&fsnotify.Create == fsnotify.Create {
					fmt.Println("Created file: ", path)

					// if new directory is created, add it to watcher
					fileInfo, err := os.Stat(event.Name)
					if err != nil {
						printErr(err)
					} else if fileInfo.IsDir() {
						watcher.Add(event.Name)
						fmt.Println("[INFO] Added: ", event.Name+" to watch list")
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
