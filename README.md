# BIFLUX
--------
# 🔁 Bidirectional ClickHouse & Flat File Data Ingestion Tool

## 📌 Project Overview

This is a full-stack web application that enables **bidirectional data transfer** between:

- **ClickHouse Database** (as source or target)
- **Flat File (CSV)** (as source or target)

It allows users to select data columns, handle JWT authentication for ClickHouse, and view ingestion status and record counts through a simple web interface.

---

## 🚀 Features

- 🔄 **Bidirectional Data Flow**:
  - Export data from **ClickHouse → CSV**
  - Import data from **CSV → ClickHouse**
  
- ✅ **JWT Authentication** for ClickHouse connections

- 📂 **CSV File Upload & Download** support

- 📋 **Schema Discovery & Column Selection**:
  - View tables and columns from ClickHouse
  - Preview column headers from uploaded CSV

- 🔍 **Data Preview** before ingestion 

- 📊 **Progress Indicator** and **record count display**

- 🔁 **(Bonus)** Support for **JOIN queries** between multiple ClickHouse tables

- 🚫 **Error Handling** with user-friendly messages (e.g., invalid credentials, connection failures, malformed CSV)

---

## 🧑‍💻 Technologies Used

### ⚙️ Backend (Node.js + Express)

- `express`: Web server
- `@apla/clickhouse`: ClickHouse client for Node.js
- `jsonwebtoken`: For handling JWT tokens
- `csv-parser`, `fast-csv`: For reading/writing CSV files
- `multer`: For handling file uploads
- `fs`: Native file handling
- `cors`, `dotenv`: Utility libraries

### 💻 Frontend (React)

- `React`: UI framework
- `axios`: For API calls
- `react-dropzone` or basic file input (for file uploads)
- `react-toastify` or alert system for status messages

---

## 🖼️ User Interface (UI) Flow

1. **Select Source**: Choose "ClickHouse" or "Flat File"
2. **Provide Connection Details** (ClickHouse host, port, user, JWT, etc.)
3. **Load Schema**: Fetch tables or columns
4. **Select Columns**: Choose which columns to ingest
5. **Choose Target**: Where the data should go (CSV or ClickHouse)
6. **Start Ingestion**
7. **View Results**: Ingestion complete message + record count

---

## 🔧 Setup Instructions

### Setting Up Docker for ClickHouse
#### 1.1 Install Docker
If you don't have Docker installed, follow the instructions here: Install Docker.

#### 1.2 Run ClickHouse Docker Container
Open PowerShell and run the following command to pull and start the ClickHouse server container:

docker run -it --rm --name my-clickhouse -d -p 8123:8123 -p 9000:9000 clickhouse/clickhouse-server
This command will:

Run ClickHouse in detached mode (-d).

Map ports 8123 (HTTP interface) and 9000 (native protocol) to your local machine.

Verify that the container is running:
docker ps
This will display the running containers, including my-clickhouse.

#### 1.3 Configure ClickHouse for JWT Authentication
Inside the Docker container, create the users.xml and config.xml files to enable JWT authentication.

#### 1.3.1 users.xml
Create the users.xml file in the Docker container with the following content:

<clickhouse>
  <users>
    <default>
      <password>default_password</password>
      <networks>
        <ip>::/0</ip>
      </networks>
      <profile>default</profile>
      <quota>default</quota>
    </default>

    <auth0_user>
      <profile>default</profile>
      <quota>default</quota>
      <networks>
        <ip>::/0</ip>
      </networks>
      <authentication>
        <jwt>
          <issuer></issuer>
          <jwks_url></jwks_url>
          <audience></audience>
        </jwt>
      </authentication>
    </auth0_user>
  </users>
</clickhouse>
#### 1.3.2 config.xml
You may need to adjust any necessary configurations inside config.xml based on your specific requirements, but by default, the ClickHouse server runs without requiring changes in the config.

#### 1.3.3 Bind Configuration Files to Docker Container
You can bind the users.xml and config.xml files from your local system into the Docker container instead of manually editing them inside the container. Use the following command:

docker run -it --rm --name my-clickhouse -d -p 8123:8123 -p 9000:9000 -v C:\path\to\users.xml:/etc/clickhouse-server/users.xml -v C:\path\to\config.xml:/etc/clickhouse-server/config.xml clickhouse/clickhouse-server
This command mounts the users.xml and config.xml from your local machine into the container.

#### 1.4 Check Docker Logs (Optional)
To ensure ClickHouse started properly, check the logs with the following command:

docker logs my-clickhouse
Setting Up Auth0 for JWT Authentication
#### 2.1 Create a New Application in Auth0
Go to the Auth0 Dashboard and create a new Application (e.g., Regular Web App).

#### 2.2 Create a New API
Navigate to APIs and create a new API. Set the Audience to https://clickhouse-api (this must match the audience configured in ClickHouse).

#### 2.3 Get the Client ID and Secret
Go to the Applications section in Auth0, select your application, and note down the Client ID and Client Secret.

#### 2.4 Generate JWT Token
Use PowerShell to generate a JWT token using your Client ID and Client Secret. Run the following command:

$body = @{
  client_id     = "YOUR_CLIENT_ID"
  client_secret = "YOUR_CLIENT_SECRET"
  audience      = "YOUR_API_IDENTIFIER"
  grant_type    = "client_credentials"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "https://YOUR_DOMAIN/oauth/token" `
                              -Method POST `
                              -ContentType "application/json" `
                              -Body $body

$response.access_token
### 🖥️ Prerequisites

- Node.js and npm
- Docker (for running ClickHouse locally)
- Git


# 🛠️ Setup, Configuration & Run Instructions
### 📁 Clone the Repository
- git clone https://github.com/sourav8927/BiFlux-Zeotap-assignment2.git
- cd BiFlux-Zeotap-assignment2

### 🔙 Backend Setup
- cd .\BIFLUX-server\
- cp .env.example .env
- paste
- 
### Setup the 📁 clickhouse_config/ folder
- put your own credentials of AUTHO in users.xml
- # Run in powershell
- docker run -d --name biflux-clickhouse '
  -p 8123:8123 
  -v ./clickhouse_config/users.xml:/etc/clickhouse-server/users.xml '
  -v ./clickhouse_config/config.xml:/etc/clickhouse-server/config.xml '
  clickhouse/clickhouse-server:23.8.3
  
-open docker and check its running or not with Bind mount inside container Dashboard
### Docker looks like
![image](https://github.com/user-attachments/assets/28c6bb65-2fe5-4f69-92fb-d60f25fc423d)

![image](https://github.com/user-attachments/assets/de01fb8c-8531-4205-ab06-3b32ce4ce54a)

![image](https://github.com/user-attachments/assets/bff5643e-34cc-43b0-b0b6-b4b70a290dca)

### Testing purpose : Generate token using powershell->
$response = Invoke-RestMethod -Uri "Isser which you put in users.xml /oauth/token"
-Method POST -ContentType "application/json" -Body (@{
  client_id = "own client id from auth0"
  client_secret = "auth0 client secret"
  audience = "https://clickhouse-api"
  grant_type = "client_credentials"
} | ConvertTo-Json -Depth 3); $response.access_token

then

$token = "your own generated token from previous command"

Invoke-RestMethod -Uri "http://localhost:8123/?query=SELECT+1" `
  -Method GET `
  -Headers @{ "Authorization" = "Bearer $token" }


# Auth0 Credentials (replace with your own or use provided test keys)
AUTH0_DOMAIN=https://your-auth0-domain/
AUTH0_CLIENT_ID=your-client-id
AUTH0_CLIENT_SECRET=your-client-secret
AUTH0_AUDIENCE=https://clickhouse-api

# ClickHouse Config
CLICKHOUSE_URL=http://localhost:8123
CLICKHOUSE_USER=auth0_user
- PORT=5000
- 
- npm i
### ▶️ Start the Backend Server:
- nodemon server.js
- The backend server will run on: http://localhost:5000

### 🌐 Frontend Setup
- cd .\BIFLUX-client\
- npm install
### ▶️ Start the Frontend App:
- npm run dev
- The frontend will be accessible at: http://localhost:port
