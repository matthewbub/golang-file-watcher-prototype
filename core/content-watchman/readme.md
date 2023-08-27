# Content Watchman

This is a simple tool that watches a directory for changes and commits them to git. 

NOTE: It is intended to be used with the [content](../content) directory of this project and hasn't been tested with any other directory.

## CLI Flags

Here are the command-line flags you can use:

- `--help`: Shows the help menu.
  - Example: `--help`

- `--dir`: Specifies the content directory to watch.  
  - Example: `--dir=../content`

- `--count`: Sets the number of changes to watch for before committing to git.
  - Example: `--count=5`

- `--message`: Sets the commit message to use when committing to git.
  - Example: `--message="auto commit"`

- `--branch`: Specifies which git branch to commit to.
  - Example: `--branch=master`

- `--debug`: Enables the display of debug logs.
  - Example: `--debug`

- `--validate-path`: Validates the path to the content directory without running the watcher. Useful for configuring the watcher.
  - Example: `--validate-path=../content`

- `--config`: Launches the configuration wizard.
  - Example: `--config`

## Setup and Configuration

The first time you run the watcher, it will prompt you to configure it. You can also run the configuration wizard at any time by passing the `--config` flag.

## Roadmap

This is a work in progress. Here's the status of the flags referenced above:

- [ ] `--help`
- [ ] `--dir`
- [ ] `--count`
- [ ] `--message`
- [ ] `--branch`
- [ ] `--debug`
- [ ] `--validate-path`
- [ ] `--config`
