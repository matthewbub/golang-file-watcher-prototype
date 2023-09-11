# Registered under MIT License 2021
# https://github.com/9mbs/conventional-commit-helper
#!/bin/bash
declare -a conventional_commits
declare -a projects

# https://www.conventionalcommits.org/en/v1.0.0/
conventional_commits=(fix feat refactor build chore ci docs style test wip revert)
projects=("content" "www" "core/content-watchman" "core/student-api" "global")

if [ $# -eq 0 ]
then
  echo "Error: no message specified.. aborting commit :)" && exit 1
else
  # optional
  # git add .
  git status

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

  git commit -m "[$proj] $message - $@"
fi