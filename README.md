# Project Setup Guide

## Project Purpose
The Node.js API project aims to serve as the backend for an OTT (Over-The-Top) media streaming platform, following the MVC architecture to ensure a structured and maintainable codebase. By separating concerns into models, controllers, and potentially services, the application promotes scalability, code reusability, and easier maintenance. This architecture facilitates handling user requests, managing data, and ensuring efficient interaction with the underlying data storage (database) while supporting future expansions and enhancements.

## Requirement
1. MongoDB Atlas Setup (for database management)
2. Cloudinary Setup (for uploading thumbnail and poster images for contents)

## Setting Up SSL Certificate (not necessary for testing)

### 1. Install OpenSSL
    Download and install OpenSSL from [OpenSSL official website](https://slproweb.com/products/Win32OpenSSL.html).
### 2. Generate a Private Key
    openssl genrsa -des3 -out server.key 2048
### 3. Generate a CSR
    openssl req -new -key server.key -sha256 -out server.csr

### 4. Generate a Self-Signed Certificate
    openssl x509 -req -days 365 -in server.csr -signkey server.key -sha256 -out server.crt

## Create .env file in the root directory of the project (an example of .env provided)

## Install npm modules
Install all the modules required for the project
```
npm i -y
```

## Next run the following script to quickly setup a list of users to test out the api
```
nodemon .\scripts\user-setup.js
```

---
---

# MongoDB Atlas Setup
Follow these steps to set up MongoDB Atlas, create a project, and create a cluster:

## 1. Create a MongoDB Atlas Account
#### Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).
#### Click on "`Start Free`" or "`Sign In`" if you already have an account.
#### Follow the instructions to `SignUp` or `Login`.

## 2. Create a New Project
#### Once logged in, click on "`New Project`".
#### Enter a project name and click "`Next`".

## 3. Create a Cluster
#### After creating the project, click on "`Build a Cluster`".
#### Choose a cloud provider (e.g., `AWS`, `GCP`, `Azure`) and region for your cluster.
#### Select the cluster tier (free tier is `M0`).
#### Click "`Create Cluster`".
#### Wait for the cluster to be created. This may take a few minutes.

## 4. Add Your IP Address:
#### Go to the "`Network Access`" section under "`Security`".
#### Click "`Add IP Address`".
#### Choose "`Allow Access from Anywhere`" or add your specific IP address.
#### Click "`Confirm`".

## 5. Connect to Your Cluster
#### Go to the "`Database" under "Deployment`" section.
#### Click "`Connect`" next to your cluster.
#### Choose "`MongoDB for VS Code`".
#### Copy the connection string. It starts like this:
```
mongodb+srv://<username>:<password>@cluster0.mongodb.net/
```
#### Replace username, password with your actual `username`, `password`.

## 6. MongoDB setup for VSCode
#### Install the extension `MongoDB setup for VSCode`.
#### Click the MongoDB icon on the activity bar
#### Click on the `+` icon on the Connections bar
#### Click `Connect` option for `Connect with Connection String`
#### Add the copied connection string

# **Project Details:**
This is a Nodejs project to create the API (for now) for the OTT-Clone project.
The project follows the MVC architecture pattern. For a quick understanding of what the MVC architecture is read below:

### `MVC Architecture Overview`
MVC (Model-View-Controller) is an architectural pattern widely used in software development, including web applications like this Node.js API for an OTT-Clone project. It divides an application into three interconnected components:

* #### **Model**
    Represents the data and business logic of the application.
    Interacts with the database (if applicable) to manage data retrieval, storage, and manipulation.

* #### **View**
    Presents data to the user or acts as the interface through which users interact with the application, i.e, corresponds to the UI components (HTML, templates, etc.).

* #### **Controller**

    Handles user input and interaction, manipulating the model and directing data to the view.
    Acts as an intermediary between models and views, processing incoming requests, executing appropriate actions, and returning responses.
    Controllers in this project likely manage endpoints and route requests to appropriate services or models.

## Directory Structures
* **app/:** Setting up the express app
* **config/:** Configuration files for the application, including environment database configurations (*mongoose*, *roles and permissions*, *ssl*), etc.
* **controllers/:** Contains controller logic, responsible for handling incoming HTTP requests, processing them, and returning responses.
* **middlewares/:** Contains a collection of user defined middlewares critical to the application.
* **models/:** Contains data models: *database schemas* and *data manipulation logic*.
* **routes/:** Defines application routes (mapping URLs to appropriate controllers).
* **scripts/:** Possibly contains scripts (for now contains only admin setup script)
* **ssl/:** Include SSL details for communications over HTTPS.
* **utils/:** Includes several utility functions used across the application.

## Project Files
* **.env:** Stores environment variables for the application.
* **Notes.txt:** Notes for the project.
* **server.js:** Entry point file that initializes the application, sets up middleware, defines routes, and starts the server.