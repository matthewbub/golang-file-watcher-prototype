---
description: Working with PostgreSQL on MacOS
---

# PostgreSQL on MacOS for Dummies

Connecting to a PostgreSQL database on macOS involves several steps, from installing PostgreSQL to running it and finally connecting to it via a client or programmatically. Here's a step-by-step guide:

## Step 1: Install PostgreSQL Using Homebrew

If you haven't installed Homebrew yet, you can install it by running the following command in your terminal:

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

**How do I know if Homebrew is installed?** You can check if Homebrew is installed by running the following command in your terminal:

```shell
brew --version
```

If Homebrew is installed, you should see the version number. Otherwise, you'll see an error message.

After installing Homebrew, you can install PostgreSQL with:

```shell
brew install postgresql
```