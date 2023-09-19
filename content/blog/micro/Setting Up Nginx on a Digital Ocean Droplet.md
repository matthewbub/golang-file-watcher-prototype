# Setting Up Nginx on a Digital Ocean Droplet

To set up Nginx on your Digital Ocean Droplet running Docker, you'll need to install Nginx, configure it, and finally, link it to your application. Here's a step-by-step guide:

## Step 1: Install Nginx

SSH into your Digital Ocean Droplet.

```bash
ssh username@<Your Droplet's IP Address>
```

Update the package list and install Nginx:

```bash
sudo apt update
sudo apt install nginx
```

## Step 2: Enable and Start Nginx

Enable Nginx to start on boot and start the service.

```bash
sudo systemctl enable nginx
sudo systemctl start nginx
```

## Step 3: Create Nginx Configuration File

Create a new Nginx configuration file for your application.

```bash
sudo nano /etc/nginx/sites-available/<Your Domain Name>
```

## Step 4: Edit Configuration File

Add the following configuration to the file, adjusting for your specific needs.

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

- `listen 80;`: Listens on port 80 for incoming HTTP requests.
- `server_name`: Replace with your domain name.
- `proxy_pass`: Directs traffic to your app running on port 3000.

## Step 5: Enable Configuration

Create a symbolic link to enable the configuration.

```shell
sudo ln -s /etc/nginx/sites-available/my_app /etc/nginx/sites-enabled/
```
