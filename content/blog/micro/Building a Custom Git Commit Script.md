# Building a Custom Git Commit Script

This guide will help you understand and create a custom git commit script that prompts the user to select a project and commit type. This script is particularly useful if you're working with [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) and need to maintain a consistent commit message structure.

## Prerequisites

- Basic familiarity with shell scripts
- A Unix-like command-line interface, such as Bash
- Git installed on your system
- Node.js installed on your system (any modern version will do)
- A text editor or IDE of your choice


## Step 1: Create the Shell Script File

Create a new file in your project root named `commit.sh`:

```shell
touch commit.sh
```

Open this file in your preferred text editor.

## Step 2: Add the Shebang Line

At the top of the `commit.sh` file, add the following line:

```shell
#!/bin/bash
```

This is called a shebang line, and it specifies the interpreter for the script. In this case, we're using bash.

## Step 3: Declare Arrays for Projects and Commit Types

Next, declare an an array for your commit types. If you're working in a mono-repo and have multiple projects, you can also declare an array for your projects. For example:

```shell
declare -a conventional_commits
declare -a projects

# https://www.conventionalcommits.org/en/v1.0.0/
conventional_commits=(fix feat refactor build chore ci docs style test wip revert)
projects=("ProjA" "ProjB" "ProjC")
```

## Step 4: Check for Commit Message

This section checks if a commit message was provided when the script was run. If not, it prints an error message and exits the script:

```shell
if [ $# -eq 0 ]
then
  echo "Error: no message specified.. aborting commit" && exit 1
```

## Step 5: Add Files to Git and Display the Status

This optional step adds all changed files to git and shows the status. You may prefer to alter this step to suit your needs. For example, you may want to add only certain files or skip this step altogether. Here's how you can add all files and display the status:

```shell
git add .
git status
```

## Step 6: Select Project and Commit Type

Next, display prompts for the user to select a project and commit type. We use a select loop to provide a numbered list for each array:

```shell
echo "Select project: "
select proj in "${projects[@]}"; do 
  case "$proj" in
      "$proj") break ;;    
  esac  
done;

echo "Select commit type: "
select message in "${conventional_commits[@]}"; do 
  case "$message" in
      "$message") break ;;    
  esac  
done;
```

## Step 7: Commit Changes

Finally, commit the changes with a message that includes the selected project, commit type, and the provided commit message:

```shell
git commit -m "[$proj] $message - $@"
```

Here, `$@` represents all of the arguments provided when the script was run (i.e., the commit message).

## Step 8: Save and Close the File

Save your changes and close the file.

## Step 9: Make the Script Executable

Before you can run the script, you need to make it executable. Run the following command:

```shell
chmod +x commit.sh
```

Now, you can use the script to commit changes with a consistent message structure. Simply run the script and follow the prompts:

```shell
./commit.sh "your commit message"
```

That's it! You've created a custom git commit script.