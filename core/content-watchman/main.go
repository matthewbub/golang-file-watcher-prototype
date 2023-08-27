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

// traverse directory and add all subdirectories to watcher
func watchDir(path string, watcher *fsnotify.Watcher) {
	filepath.Walk(path, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			fmt.Println("Error: ", err)
			return err
		}

		if info.IsDir() {
			err := watcher.Add(path)
			if err != nil {
				fmt.Println("Error: ", err)
				return err
			}

			fmt.Println("Watching: ", path)
		}
		return nil
	})
}

func main() {
	var contentDir = readCurrentDir()
	fmt.Println("Watching directory: ", contentDir)

	watcher, err := fsnotify.NewWatcher()
	if err != nil {
		fmt.Println("Error: ", err)
		os.Exit(1)
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
						fmt.Println("Error: ", err)
					} else if fileInfo.IsDir() {
						watcher.Add(event.Name)
						fmt.Println("Watching: ", event.Name)
					}
				}
			case err := <-watcher.Errors:
				fmt.Println("Error: ", err)
			}
		}
	}()

	// init watcher
	watchDir(contentDir, watcher)

	<-done

}
