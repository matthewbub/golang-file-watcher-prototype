# Angus

This is a simple tool that watches a directory for changes and commits them to git. 

> NOTE: This is a work in progress, and is not perfect. You'll need to actually be within `./services/angus` to run it the script. I'll fix this soon.

> NOTE: It is intended to be used with the [content](../content) directory of this project and hasn't been tested with any other directory.


## CLI Flags

Here are the command-line flags you can use:

- `--help`: Shows the help menu.
  - Example: `--help`


## Requirements
- Commiting should be optional via flags
- Content should be distributed into build based on a frontmatter property. _ie. tag=blog should be distributed into /blog_
- We should be able to move the executable if needed, relative paths should be configurable
- Content should be distributed via a JSON object similar to contentlayer
- CLI should have a "watch" mode
- CLI should have a "build" mode
- CLI should have a "commit" mode that can be used with "watch" or "build"s