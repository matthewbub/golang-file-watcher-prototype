# Setting Up a Firewall with Nginx on a Digital Ocean Droplet

A firewall is essential for securing your server by controlling the incoming and outgoing network traffic. On Ubuntu, you can use ufw (Uncomplicated Firewall) to manage your firewall rules. Here's how to set it up alongside Nginx:

## Step 1: Install UFW

SSH into your Digital Ocean Droplet.

```bash
ssh username@<Your Droplet's IP Address>
```

Update your package list and install UFW.

```bash
sudo apt update
sudo apt install ufw
```

## Step 2: Enable Basic Firewall Rules

Allow SSH connections to manage your server remotely.

```bash
sudo ufw allow ssh
```

Enable UFW.

```bash
sudo ufw enable
```

## Step 3: Allow Nginx Through the Firewall

To allow Nginx to receive incoming web traffic, you need to configure UFW to allow it.

```bash
sudo ufw allow 'Nginx Full'
```

## Step 4: Verify Firewall Rules

Check the status of UFW to ensure the rules are correctly set.

```bash
sudo ufw status
```

You should see that Nginx is allowed.

## Step 5: Test Nginx

After setting up the firewall, make sure Nginx is still functioning correctly.

Navigate to your domain or IP address in a web browser.

You should see your application running, confirming that Nginx is allowed through the firewall.

## Step 6: Additional Security Measures

For added security, you can also deny all incoming traffic and then only allow specific services.

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
```
