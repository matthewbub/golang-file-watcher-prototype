package main

import (
	"fmt"
	"os"
)

// readCurrentDir returns the current directory
func readCurrentDir() string {
	dir, err := os.Getwd()

	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	return dir
}

func main() {
	currentDir := readCurrentDir()
	fmt.Println(currentDir)
}
