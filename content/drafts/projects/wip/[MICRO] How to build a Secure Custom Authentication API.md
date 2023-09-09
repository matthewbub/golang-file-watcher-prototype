# How to build a Secure Custom Authentication API
# Creating a New Node.js Project with Express

## Step 1: Initialize a New Node.js Project
1. Open your terminal or command prompt.
2. Navigate to the directory where you'd like to create your new project.
3. Run the following command to initialize a new Node.js project:
    ```
    npm init -y
    ```

## Step 2: Install Express
1. Ensure you are in the root directory of your newly created Node.js project.
2. Type the following command to install the Express framework:
    ```
    npm install express --save
    ```

## Step 3: Create an Express Application
1. Create a new file named `app.js` in your project directory.
2. Open `app.js` using your preferred text editor.
3. Insert the following code to set up a basic Express application:
    ```javascript
    const express = require('express');
    const app = express();
    const port = 3000;

    app.get('/', (req, res) => {
      res.send('Hello, world!');
    });

    app.listen(port, () => {
      console.log(`App is running at http://localhost:${port}`);
    });
    ```

To run the application, execute `node app.js` in your terminal. Visit `http://localhost:3000` in your web browser to see the output.



 3 Ways To Testing your Express Application

## Step 4: Test 'Hello World' Route Using HTTP File in VS Code

### Introduction to cURL and `.http` File
cURL is a command-line tool for making HTTP requests. Visual Studio Code (VS Code) provides an `.http` file extension to simulate cURL-like requests directly within the editor.

1. Create a new file named `requests.http` in your project directory.
2. Open `requests.http` using VS Code.
3. Add the following line to test the "Hello, world!" route:
    ```
    GET http://localhost:3000/
    ```
4. Save the file and click the "Send Request" link above the line you've added. You should see "Hello, world!" displayed as the output.

## Step 5: Test 'Hello World' Route Using Postman

### Introduction to Postman
Postman is a widely used tool for API development and testing. It offers a user-friendly interface to send HTTP requests.

#### Installation
- Download Postman from [this link](https://www.postman.com/downloads/).
- Follow the installation steps specific to your operating system.

1. Open Postman after installation is complete.
2. Click the "New Request" button.
3. In the request type dropdown, select "GET."
4. Enter `http://localhost:3000/` into the URL field.
5. Click the "Send" button. You should receive a response displaying "Hello, world!"

After completing these steps, you will have successfully tested your basic Express application's 'Hello World' route using both an HTTP file in VS Code and Postman.

## Step 6: Install Helmet

### What is Helmet?
Helmet is a middleware package for Express that enhances the security of your application. It does this by setting various HTTP headers to guard against common vulnerabilities.

### Configure Helmet into Your Express App
1. First, install Helmet by running the following command in your terminal:
    ```bash
    npm install helmet --save
    ```
2. Open your `app.js` file in your text editor.
3. Add the following lines at the top of the file, right after you require Express:
    ```javascript
    const helmet = require('helmet');
    ```
4. Next, include Helmet as a middleware in your application by adding this line after you initialize your `app` object but before any routes:
    ```javascript
    app.use(helmet());
    ```

### Benefits of Helmet
- **Security Enhancements**: Helmet sets various HTTP headers that can protect your application against attacks like clickjacking and content security policy vulnerabilities.
- **Best Practices**: Using Helmet aligns your application with security best practices, making it more robust against known types of attacks.
- **Ease of Use**: With just a few lines of code, you can improve the security posture of your application substantially.

After integrating Helmet, your application will have better security measures against common web vulnerabilities. It's an essential step in building a secure custom authentication API.

## Step 7: Install CORS

### What is CORS?
CORS (Cross-Origin Resource Sharing) is a security feature implemented by web browsers to restrict web requests between different origins. The CORS middleware for Express allows you to configure these CORS headers, making it easier to build APIs that can be securely accessed from different domains.

### Configure CORS into Your Express App
1. To install CORS, execute the following command in your terminal:
    ```bash
    npm install cors --save
    ```
2. Open your `app.js` file.
3. Add the following lines to require CORS:
    ```javascript
    const cors = require('cors');
    ```
4. Implement CORS as middleware by inserting this line after you initialize your `app` object but before any routes:
    ```javascript
    app.use(cors());
    ```

### Benefits of CORS
- **Resource Sharing**: CORS allows your API to be consumed by client-side web applications running on different domains.
- **Security**: It lets you control which origins have access to specific routes or types of data.
- **Flexibility**: With CORS, you can specify particular methods and headers that are permitted, offering granular control over how your resources are shared.

Adding CORS to your application enhances its interoperability and security. It gives you the ability to specify who can access your resources, how they can use them, and what data they can receive.

## Step 8: Install Morgan

### What is Morgan?
Morgan is a logging middleware for Express applications. It generates logs for incoming HTTP requests, helping you monitor the behavior, errors, and performance of your app.

### Configure Morgan into Your Express App
1. To install Morgan, run the following command:
    ```bash
    npm install morgan --save
    ```
2. Open your `app.js` file in your text editor.
3. Add these lines to import Morgan:
    ```javascript
    const morgan = require('morgan');
    ```
4. To use Morgan as middleware, include this line right after you initialize your `app` object but before any routes:
    ```javascript
    app.use(morgan('tiny'));
    ```

### Benefits of Morgan
- **Monitoring**: Morgan provides real-time logging of HTTP requests, aiding in monitoring app usage.
- **Debugging**: Detailed logs make it easier to troubleshoot errors and identify potential vulnerabilities.
- **Analytics**: The logs can be used for basic analytics, like tracking user behavior or frequent routes accessed.

By adding Morgan to your tech stack, you're giving yourself a powerful tool for monitoring and debugging your application. Its logs offer valuable insights into the application's operations, contributing to improved reliability and security.

## Step 9: Install express-slow-down and express-rate-limit

### What Do These Packages Do?
- **express-slow-down**: This middleware controls the speed of repeated requests from the same client IP address.
- **express-rate-limit**: This middleware limits the total number of requests a client can make in a specified time frame.

### Configure express-slow-down and express-rate-limit
1. Install both packages by running the following command:
    ```bash
    npm install express-slow-down express-rate-limit --save
    ```
2. Open your `app.js` file.
3. Import both middleware at the top:
    ```javascript
    const slowDown = require('express-slow-down');
    const rateLimit = require('express-rate-limit');
    ```
4. Configure `express-slow-down`:
    ```javascript
    const speedLimiter = slowDown({
      windowMs: 15 * 60 * 1000, // 15 minutes
      delayAfter: 100,
      delayMs: 500
    });
    app.use(speedLimiter);
    ```
5. Configure `express-rate-limit`:
    ```javascript
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100
    });
    app.use(limiter);
    ```

### Benefits of These Packages
- **express-slow-down**:
  - **Mitigates Brute-Force Attacks**: By slowing down repeated requests, it reduces the effectiveness of brute-force attacks.
  - **Resource Management**: Allows legitimate users to access the service while deterring abuse.
- **express-rate-limit**:
  - **Prevents Abuse**: Restricts the number of requests from a single IP, reducing the chance of DDOS attacks or spam.
  - **Resource Optimization**: Helps to ensure that server resources are allocated to a diverse set of clients.

By adding these middlewares to your application, you're taking a big step towards preventing abuse and enhancing security. They give you greater control over how your API resources are accessed, maintaining a more stable and secure environment.

## Step 10: Install Nodemon

### What is Nodemon?
Nodemon is a utility that automatically restarts your Node.js application when file changes are detected in the directory. It's particularly useful during the development phase to speed up the update and testing cycle.

### Configure Nodemon into Your Express App
1. Install Nodemon as a development dependency:
    ```bash
    npm install nodemon --save-dev
    ```
2. Open your `package.json` file.
3. Add a new script to the "scripts" section as follows:
    ```json
    "scripts": {
      "start": "node app.js",
      "dev": "nodemon app.js"
    },
    ```
Now you can run your application in development mode using `npm run dev`.

### Benefits of Nodemon
- **Efficiency**: Automates the restart process, eliminating manual stops and starts, thereby saving development time.
- **Ease of Use**: Once configured, Nodemon operates seamlessly in the background, requiring no additional interaction.
- **Error Discovery**: Immediate restarts upon file changes mean errors can be discovered and fixed more rapidly.

Nodemon is a development tool you shouldn't overlook. It significantly accelerates the development process by automating application restarts when file changes occur, allowing for quicker iterations and error fixes.

## Step 11: Install Dotenv

### What is Dotenv?
Dotenv is a zero-dependency module that enables you to store environment variables in a `.env` file. This is particularly useful for managing secrets, API keys, and other sensitive information separate from your codebase.

### Configure Dotenv into Your Express App
1. Install Dotenv by executing the following command:
    ```bash
    npm install dotenv --save
    ```
2. Create a `.env` file in the root directory of your project.
3. Add an environment variable for demonstration, for example:
    ```env
    MY_SECRET=SuperSecretValue
    ```
4. Open your `app.js` file.
5. At the top, require and configure Dotenv as follows:
    ```javascript
    require('dotenv').config();
    ```
6. Confirm it works by adding a console log in your `app.js` file:
    ```javascript
    console.log(`Your secret is ${process.env.MY_SECRET}`);
    ```
Run your application and check the terminal to verify that the secret value is displayed.

### Benefits of Dotenv
- **Security**: Keeps sensitive information out of your codebase, reducing the risk of accidental exposure.
- **Ease of Management**: Centralizes environment variables in one file, making it easier to manage.
- **Portability**: Makes it simpler to set different configurations for different environments (development, testing, production).

By incorporating Dotenv into your application, you bolster its security and manageability. You also gain the flexibility to tailor configurations to various environments, further enhancing your app's robustness and scalability.

## Step 12: Introduce Supabase

### What is Supabase?
Supabase is an open-source alternative to Firebase, offering a suite of tools like a realtime database, authentication services, and storage solutions. It's an all-in-one backend service that simplifies database and API management.

### Steps to Create a User Table in Supabase

#### 1. Login or Create a New Account
Navigate to the Supabase website and login to your existing account or sign up for a new one.

#### 2. Create a New Project
From the dashboard, click on the "New Project" button and follow the prompts to initialize your new project.

#### 3. Create a New Table
Navigate to the 'Table Editor' and click on the 'New Table' button. Name the table `users`.

#### 4. Add Columns to `users` Table
Add the following columns to your table:
- `id` (primary key)
- `email` (text)
- `password` (text)
- `username` (text)
- `security_questions` (json)
- `security_answers` (json)
- `created_at` (timestamp)
- `updated_at` (timestamp)

#### 5. Demo the SQL Editor
1. Navigate to the 'SQL Editor'.
2. To CREATE a new item, execute the following SQL statement:
    ```sql
    INSERT INTO users (email, password) VALUES ('test@email.com', 'password123');
    ```
3. To READ items, execute:
    ```sql
    SELECT * FROM users;
    ```
4. To DELETE an item, execute:
    ```sql
    DELETE FROM users WHERE email = 'test@email.com';
    ```

### Benefits of Supabase
- **Flexibility**: Offers a wide array of tools and services, making it adaptable to various use-cases.
- **Open-Source**: Community-driven and constantly evolving.
- **Real-Time**: Real-time database updates enable dynamic and interactive applications.

Supabase provides a robust and flexible backend solution for your applications. Its real-time features and community-driven approach make it an excellent choice for modern development needs.

## Step 13: Install Supabase in Your Express App

### What is the Supabase Library?
The Supabase client library facilitates easy interaction between your Express app and your Supabase backend. It allows you to perform operations like creating, reading, updating, and deleting data directly from your Express application.

### Where to Find Supabase API Keys
1. Go to your Supabase dashboard.
2. Select the project you've been working on.
3. Navigate to the 'API' section.
4. Here you will find your `supabaseUrl` and `supabaseKey`. Keep these keys confidential.

### Configure Supabase into Your Express App
1. Install the Supabase package by running:
    ```bash
    npm install @supabase/supabase-js
    ```
2. Open your `.env` file and add the following lines:
    ```env
    SUPABASE_URL=your_supabase_url_here
    SUPABASE_KEY=your_supabase_key_here
    ```
3. Open your `app.js` file.
4. Import and initialize the Supabase library:
    ```javascript
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
    ```

By completing this section, you have successfully integrated Supabase into your Express application. This provides you with a powerful toolset for backend operations and paves the way for more advanced functionalities in your project.

## Step 15: Test User Signup Route

### Testing with `.http` File in VS Code

1. Open your existing `requests.http` file or create a new one if you don't have it.
2. Add the following HTTP request to test the signup route:
    ```http
    ### Signup Test
    POST http://localhost:3000/signup
    Content-Type: application/json

    {
      "email": "test@email.com",
      "password": "password123",
      "username": "testUser",
      "security_questions": {
        "question1": "What is your favorite color?",
        "question2": "What was your first pet's name?"
      }
    }
    ```
3. Save the file and click on "Send Request" above the HTTP request. You should receive a `201 Created` response with the inserted data.

### Testing with Postman

1. Open Postman.
2. Create a new request and set the method to `POST`.
3. Input `http://localhost:3000/signup` as the request URL.
4. Go to the "Body" tab, select "raw" and "JSON (application/json)".
5. Add the following JSON payload:
    ```json
    {
      "email": "test@email.com",
      "password": "password123",
      "username": "testUser",
      "security_questions": {
        "question1": "What is your favorite color?",
        "question2": "What was your first pet's name?"
      }
    }
    ```
6. Click "Send". You should receive a `201 Created` response with the inserted data.

By following these instructions, you should be able to test your new signup route using either the `.http` file in VS Code or Postman. This confirms that your Express app correctly handles user signups.


## Step 16: Create User Login Route

### What Does the User Login Route Do?
The user login route authenticates existing users by matching their email and password with the database. Note that this implementation is not secure yet, as it does not involve password hashing or token-based authentication.

### Required Data
- Email
- Password

### Steps to Create User Login Route
1. Open your `app.js` file.
2. Below the signup route, add the following code to create the login route:
    ```javascript
    app.post('/login', async (req, res) => {
      const { email, password } = req.body;
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();

      if (error || !data) return res.status(400).json({ error: 'Invalid email or password' });
      res.status(200).json(data);
    });
    ```

### Testing User Login Route

#### With `.http` File in VS Code

1. Open your `requests.http` file.
2. Add the following HTTP request for login:
    ```http
    ### Login Test
    POST http://localhost:3000/login
    Content-Type: application/json

    {
      "email": "test@email.com",
      "password": "password123"
    }
    ```
3. Save the file and click "Send Request". You should receive a `200 OK` response with user data if the login is successful.

#### With Postman

1. Open Postman.
2. Create a new request and set the method to `POST`.
3. Set the request URL to `http://localhost:3000/login`.
4. In the "Body" tab, select "raw" and "JSON (application/json)".
5. Add the following JSON payload for login:
    ```json
    {
      "email": "test@email.com",
      "password": "password123"
    }
    ```
6. Click "Send". You should receive a `200 OK` response with user data if the login is successful.

**Note**: This login method is not secure yet and should not be used in production without further improvements like password hashing and token-based authentication.

## Step 17: Install Bcrypt for Password Hashing

### What Does Bcrypt Do?
Bcrypt is a popular cryptographic library for hashing passwords. It generates a unique hash for each password, adding an extra layer of security to your application.

### Benefits of Bcrypt
- **Security**: It safeguards passwords by turning them into a hash, which is challenging to reverse-engineer.
- **Salting**: Bcrypt includes a salt in the hashing process, reducing the risk of rainbow table attacks.
- **Adaptability**: You can set the computational complexity, allowing for increased security as computers become more powerful.

### Steps to Install Bcrypt
1. Navigate to your project directory.
2. Run the following command to install Bcrypt:
    ```bash
    npm install bcrypt
    ```

## Step 18: Integrate JSON Web Tokens (JWT) with Supabase

### What is JWT?
JSON Web Token (JWT) is a compact, URL-safe means of representing claims between two parties. JWTs are used in authentication and authorization protocols, including OAuth 2.0.

### Benefits of JWT
- **Stateless**: They are self-contained, including all the required information about the user, avoiding the need for a session.
- **Scalability**: Being stateless means it's more scalable and easier to manage on the server-side.
- **Flexibility**: JWTs can be inspected and debugged easily because they are just Base64-encoded JSON strings.

### Steps to Grab JWT from Supabase Dashboard
1. Log in to your Supabase dashboard.
2. Navigate to the 'Settings' tab.
3. Under 'API', find your JWT secret key. Note: Do not share this secret key.

Incorporate this JWT secret into your application to enhance its security features, making your application more robust and secure.

## Step 19: Integrate Bcrypt into the User Signup Route

### Steps to Hash Password During Signup
1. Open your `app.js` file.
2. Import Bcrypt at the top of your file:
    ```javascript
    const bcrypt = require('bcrypt');
    ```
3. In your signup route, add the following code to hash the user password before saving it to the database:
    ```javascript
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    ```
4. Update the database insertion code to use `hashedPassword` instead of `password`.

### Updated Signup Route
Here's how the updated signup route should look:
```javascript
app.post('/signup', async (req, res) => {
  const { email, password, username } = req.body;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const { data, error } = await supabase
    .from('users')
    .insert([{ email, password: hashedPassword, username }]);

  if (error) return res.status(400).json({ error });
  res.status(201).json(data);
});
```
## Step 20: Integrate Bcrypt into the User Login Route

### Steps to Verify Hashed Password During Login
1. In your login route, retrieve the hashed password from the database.
2. Use Bcrypt's `compare` method to check if the hashed password matches the provided password:
    ```javascript
    const match = await bcrypt.compare(password, data.password);
    ```

### Updated Login Route
Here's how the updated login route should look:
```javascript
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !data) return res.status(400).json({ error: 'Invalid email or password' });

  const match = await bcrypt.compare(password, data.password);

  if (!match) return res.status(400).json({ error: 'Invalid email or password' });
  res.status(200).json(data);
});
```
## Step 23: Install and Integrate JSON Web Token (jsonwebtoken)

### Installation of jsonwebtoken
1. Open your terminal and navigate to the root directory of your Node.js project.
2. Install the `jsonwebtoken` package by executing:
    ```
    npm install jsonwebtoken --save
    ```

### Benefits of JSON Web Token
- **Secure Authentication**: JWTs can securely transmit information between parties, ensuring that the data is protected.
- **Statelessness**: JWTs are self-contained, carrying all necessary information, eliminating the need for server-side sessions.
- **Ease of Use**: Due to their compact structure, JWTs can be easily transmitted via URL, POST body, or inside HTTP headers.
- **Expiration Control**: JWTs support expiry time settings, giving you control over token validity.

### Integration into User Signup Route with 1-Hour Expiry
1. Import the `jsonwebtoken` library into your `app.js`:
    ```javascript
    const jwt = require('jsonwebtoken');
    ```
2. After successfully registering the user in the signup route, generate a JWT with a 1-hour expiry:
    ```javascript
    const token = jwt.sign({ email }, 'your_secret_key', { expiresIn: '1h' });
    ```
3. Send the token as part of the response:
    ```javascript
    res.status(201).json({ token });
    ```

### Integration into User Login Route with 1-Hour Expiry
1. Follow the same steps as in the signup route to generate a JWT with a 1-hour expiry.
    ```javascript
    const token = jwt.sign({ email }, 'your_secret_key', { expiresIn: '1h' });
    ```
2. Send the token as part of the response:
    ```javascript
    res.status(200).json({ token });
    ```

By integrating `jsonwebtoken` with expiration control, you not only enhance the security but also control the validity period of the user sessions.
## Step 24: Build and Test a Single User GET Route

### Building the GET Route
1. Open your `app.js` file in your preferred text editor.
2. Import the necessary libraries at the top of your file:
    ```javascript
    const express = require('express');
    ```
3. Add the GET route to fetch a single user by email:
    ```javascript
    app.get('/user/:email', async (req, res) => {
        // Logic to fetch user by email
    });
    ```

### Testing the GET Route

#### Using `.http` File in VS Code
1. Create or open your existing `requests.http` file in your project directory.
2. Add the following line to test the new GET route:
    ```
    GET http://localhost:3000/user/test@email.com
    ```
3. Save the file and click the "Send Request" link above the line you've added. Observe the output.

#### Using Postman
1. Open Postman and click on "New Request."
2. Select "GET" and enter the URL: `http://localhost:3000/user/test@email.com`.
3. Click "Send" and observe the output.

By following these instructions, you'll successfully build and test a GET route for fetching a single user based on email. This is a critical step in enhancing your API's functionality.

## Step 25: Fetch a Single User by Email from Supabase in the GET Route

### Updating the GET Route
1. Open your `app.js` file with your text editor.
2. Import the Supabase client that you configured earlier:
    ```javascript
    const { supabase } = require('./supabaseClient');
    ```
3. Modify the GET route to fetch a single user by email from the Supabase `users` table:
    ```javascript
    app.get('/user/:email', async (req, res) => {
        const email = req.params.email;
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (error) {
            return res.status(500).json({ error });
        }
        
        res.status(200).json({ user: data });
    });
    ```

### Testing the Supabase-Integrated GET Route

#### Using `.http` File in VS Code
1. Open your existing `requests.http` file in your project directory.
2. Add the following line to test the updated GET route:
    ```
    GET http://localhost:3000/user/test@email.com
    ```
3. Save the file and click the "Send Request" link. Check for the output, which should now include Supabase data.

#### Using Postman
1. Open Postman and create a "New Request."
2. Select "GET" and type the URL: `http://localhost:3000/user/test@email.com`.
3. Click "Send" and review the output.

By following these steps, you will have updated your GET route to fetch a single user by email from your Supabase `users` table. This is an important feature to verify user information in your application.
