package helpers

import (
	"fmt"
	"os/exec"
)

func CommitAndPushAsBot(branchName string, commitMessage string) error {
	// Switch to bot account
	cmd := exec.Command("git", "config", "user.name", "ucanbot")
	err := cmd.Run()
	if err != nil {
		return err
	}

	cmd = exec.Command("git", "config", "user.email", "9mbs.ucan.bot@gmail.com")
	err = cmd.Run()
	if err != nil {
		return err
	}

	// Stage changes
	cmd = exec.Command("git", "add", "-A")
	err = cmd.Run()
	if err != nil {
		return err
	}

	// Commit changes
	cmd = exec.Command("git", "commit", "-m", commitMessage)
	err = cmd.Run()
	if err != nil {
		return err
	}

	// Push to remote branch
	cmd = exec.Command("git", "push", "origin", branchName)
	err = cmd.Run()
	if err != nil {
		return err
	}

	// Switch back to your account (optional, but good practice)
	cmd = exec.Command("git", "config", "user.name", "9mbs")
	err = cmd.Run()
	if err != nil {
		return err
	}

	cmd = exec.Command("git", "config", "user.email", "6matbub@gmail.com")
	err = cmd.Run()
	if err != nil {
		return err
	}

	fmt.Println("Code committed and pushed successfully.")
	return nil
}
