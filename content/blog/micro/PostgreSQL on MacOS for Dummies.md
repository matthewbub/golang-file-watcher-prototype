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

### Restart PostgreSQL

Restart the PostgreSQL service:

```bash
brew services restart postgresql
```

- **When should I restart PostgreSQL?** You should restart PostgreSQL when you've made changes to the configuration file or when you've installed a new version of PostgreSQL.

### Uninstall PostgreSQL

Uninstall PostgreSQL:

```bash
brew uninstall postgresql
```

- **When should I uninstall PostgreSQL?** You should uninstall PostgreSQL when you no longer need it.
- **Would this help if I can't remember my password?** No, this would not help if you can't remember your password. Uninstalling PostgreSQL via Homebrew will not remove your data. If you can't remember your password, you can reset it by following the instructions in the next section. Alternatively, if you'd like to completely remove PostgreSQL and all of its data, you can follow the instructions in the this article: <https://blog.testdouble.com/posts/2021-01-28-how-to-completely-uninstall-homebrew-postgres>  

## Create a New Database

Create a new database with the same name as your username, which is the default database that PostgreSQL will connect to if you don't specify a database name:

```shell
createdb `whoami`
```

## Step 2: Connect to PostgreSQL

### Connect to PostgreSQL via the Command Line

Connect to PostgreSQL via the command line:

```shell
psql
```

- **What is psql?** psql is a command-line interface for PostgreSQL. It allows you to connect to a PostgreSQL database and run SQL queries.

### Connect to PostgreSQL via a GUI

You can also connect to PostgreSQL via a GUI, such as [Postico](https://eggerapps.at/postico/), [pgAdmin](https://www.pgadmin.org/), or [TablePlus](https://tableplus.com/).

### Connect to PostgreSQL Programmatically

You can also connect to PostgreSQL programmatically using a client library, such as [node-postgres](https://node-postgres.com/), [pg](https://node-postgres.com/), or [pg-promise](

## Step 3: Create a New User

Create a new user with the same name as your username:

```shell
createuser `whoami`
```

- **How can i print my username?** You can print your username by running the following command in your terminal:

```shell
whoami
```

- **What is a user?** A user is an account that can connect to a PostgreSQL database. Each user has a username and password.

## Where do `createdb` and `createuser` come from?

The `createdb` and `createuser` commands are part of PostgreSQL, an open-source relational database management system. They are utility binaries that come with PostgreSQL and can be run from the command shell.

The `createdb` command is used to create a new PostgreSQL database, while the `createuser` command is used to create a new PostgreSQL user.

These commands can be run in the shell and not within the `psql` command-line interface. They provide a convenient way to perform these actions without having to connect to the `psql` command-line interface.

## Working with PostgreSQL via Command Line

### Connect to PostgreSQL

Connect to PostgreSQL via the command line:

```shell
psql
```

If successful, you'll have entered the `psql` command-line interface and you'll see a prompt like this:

```shell
psql (version)
Type "help" for help.

username=#
```

- **What is `psql`?** psql is a command-line interface for PostgreSQL. It allows you to connect to a PostgreSQL database and run SQL queries.
- **How do I exit `psql`?** You can exit psql by typing `\q` and hitting enter.

### List Databases

First, lets list all the databases:

```shell
\l
```
