package main

import (
	"fmt"
	"os"

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
				fmt.Println("Event: ", event)
				if event.Op&fsnotify.Write == fsnotify.Write {
					fmt.Println("Modified file: ", event.Name)
				}
			case err := <-watcher.Errors:
				fmt.Println("Error: ", err)
			}
		}
	}()

	// Add directory to watcher
	err = watcher.Add(contentDir)

	if err != nil {
		fmt.Println("Error: ", err)
		os.Exit(1)
	}

	<-done

}
