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

### Start PostgreSQL

Start the PostgreSQL service:

```bash
brew services start postgresql
```

### Stop PostgreSQL

Stop the PostgreSQL service:

```bash
brew services stop postgresql
```

- **When should I stop PostgreSQL?** You should stop PostgreSQL when you're not using it to save resources.
- **If I stop PostgreSQL, will my data be lost?** No, your data will not be lost. PostgreSQL stores data in a database, which is a collection of tables. When you stop PostgreSQL, the database is still there, but it's not running. When you start PostgreSQL again, you'll be able to access the same database and tables.
- **How do I know if PostgreSQL is running?** You can check if PostgreSQL is running by running the following command in your terminal:

```shell
brew services list
```

If PostgreSQL is running, you should see `started` next to `postgresql`. Otherwise, you'll see `stopped`.

```shell
➜  ~ brew services list
Name          Status  User      File
# ...
postgresql@14 none              
```
