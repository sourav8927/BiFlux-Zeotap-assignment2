# BIFLUX

🔁 **Bidirectional ClickHouse & Flat File Data Ingestion Tool**

![GitHub license](https://img.shields.io/github/license/yourusername/biflux)
![Issues](https://img.shields.io/github/issues/yourusername/biflux)
![Forks](https://img.shields.io/github/forks/yourusername/biflux)

---

## 📌 Project Overview

A full-stack web application for **bidirectional data transfer** between:

- 🗃️ **ClickHouse Database** (as source or target)
- 📄 **Flat File (CSV)** (as source or target)

It allows users to:

- Select data columns
- Handle JWT authentication (via Auth0) for ClickHouse
- Monitor ingestion status and record counts through a clean web interface

---

## 🚀 Features

<details>
<summary><strong>🔄 Bidirectional Data Flow</strong></summary>

- Export data from ClickHouse → CSV
- Import data from CSV → ClickHouse
</details>

<details>
<summary><strong>✅ JWT Authentication</strong></summary>

- Secure ClickHouse connections with Auth0 JWT tokens
</details>

<details>
<summary><strong>📂 CSV Upload & Download</strong></summary>

- Upload CSVs for import
- Download query results as CSV
</details>

<details>
<summary><strong>📋 Schema Discovery & Column Selection</strong></summary>

- View tables and columns from ClickHouse
- Preview column headers from uploaded CSV
</details>

<details>
<summary><strong>🔍 Data Preview Before Ingestion</strong></summary>

- Review data before importing/exporting
</details>

<details>
<summary><strong>📊 Progress & Record Count</strong></summary>

- View progress indicators and final record count
</details>

<details>
<summary><strong>➕ Bonus Feature</strong></summary>

- JOIN queries between multiple ClickHouse tables
</details>

<details>
<summary><strong>❌ Error Handling</strong></summary>

- User-friendly messages for:
  - Invalid credentials
  - Connection failures
  - Malformed CSVs
</details>

---

## 🧑‍💻 Technologies Used

### ⚙️ Backend (Node.js + Express)
- `express`, `@apla/clickhouse`, `jsonwebtoken`
- `csv-parser`, `fast-csv`, `multer`, `fs`, `cors`, `dotenv`

### 💻 Frontend (React)
- `React`, `axios`, `react-dropzone`, `react-toastify`

---

## 🖼️ UI Flow

1. Select Source (ClickHouse or Flat File)
2. Provide Connection Details
3. Load Schema
4. Select Columns
5. Choose Target
6. Start Ingestion
7. View Results (record count + status)

---

## 🔧 Setup Instructions

### 📦 Docker for ClickHouse

#### 1.1 Install Docker

[Install Docker](https://docs.docker.com/get-docker/)

#### 1.2 Run ClickHouse Docker Container

```powershell
docker run -d --name biflux-clickhouse `
  -p 8123:8123 `
  -v ${PWD}\clickhouse_config\users.xml:/etc/clickhouse-server/users.xml `
  -v ${PWD}\clickhouse_config\config.xml:/etc/clickhouse-server/config.xml `
  clickhouse/clickhouse-server:23.8.3
```

✅ This command:
- Runs ClickHouse in background
- Mounts custom `users.xml` and `config.xml` from `clickhouse_config/`

#### 1.3 Confirm ClickHouse is Running

```powershell
docker ps
```

You should see `biflux-clickhouse` running.

---

### 🔐 Auth0 JWT Setup

#### 2.1 Create an Application on Auth0
[Auth0 Dashboard](https://manage.auth0.com/) → Applications → Create Application

#### 2.2 Create a New API
- Set `Identifier (audience)` to `https://clickhouse-api`

#### 2.3 Retrieve Auth0 Credentials
Get the following:
- `AUTH0_DOMAIN`
- `AUTH0_CLIENT_ID`
- `AUTH0_CLIENT_SECRET`

#### 2.4 Generate Access Token (Optional)

```powershell
$body = @{
  client_id = "YOUR_CLIENT_ID"
  client_secret = "YOUR_CLIENT_SECRET"
  audience = "https://clickhouse-api"
  grant_type = "client_credentials"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "https://YOUR_DOMAIN/oauth/token" -Method POST -ContentType "application/json" -Body $body

$response.access_token
```

#### 2.5 Test ClickHouse Query With Token

```powershell
$token = "<your_access_token>"
Invoke-RestMethod -Uri "http://localhost:8123/?query=SELECT+1" -Method GET -Headers @{ "Authorization" = "Bearer $token" }
```

---

## 🖥️ Prerequisites

- Node.js & npm
- Docker
- Git

---

## 🛠️ Backend Setup

```bash
cd BIFLUX-server
cp .env.example .env
```

### 🗂️ .env.example Template

```env
AUTH0_DOMAIN=https://your-auth0-domain/
AUTH0_CLIENT_ID=your-client-id
AUTH0_CLIENT_SECRET=your-client-secret
AUTH0_AUDIENCE=https://clickhouse-api
CLICKHOUSE_URL=http://localhost:8123
CLICKHOUSE_USER=auth0_user
PORT=5000
```

### 🔧 clickhouse_config/

Include the following:
- `users.xml`: Auth0 JWT configuration
- `config.xml`: Optional settings

> ❗ No need to manually edit XML files. The project uses pre-configured settings.

### ▶️ Run Backend

```bash
npm install
nodemon server.js
```

Server available at: `http://localhost:5000`

---

## 🌐 Frontend Setup

```bash
cd ../BIFLUX-client
npm install
npm run dev
```

Frontend runs at: `http://localhost:3000` (or next available port)

---

## 🧪 Docker Debugging

```bash
docker logs biflux-clickhouse
```

Check logs if container exits unexpectedly.

---

## 🪄 Quick Auth0 Token Request (PowerShell)

```powershell
$response = Invoke-RestMethod -Uri "https://YOUR_DOMAIN/oauth/token" -Method POST -ContentType "application/json" -Body (@{
  client_id = "YOUR_CLIENT_ID";
  client_secret = "YOUR_CLIENT_SECRET";
  audience = "https://clickhouse-api";
  grant_type = "client_credentials"
} | ConvertTo-Json -Depth 3);

$response.access_token
```

---

## 📸 Docker Screenshot Example

```md
![Docker Running Screenshot](./assets/docker-running.png)
```

---

## 💌 Sample Auth0 .env Template

```env
AUTH0_DOMAIN=https://your-auth0-domain/
AUTH0_CLIENT_ID=your-client-id
AUTH0_CLIENT_SECRET=your-client-secret
AUTH0_AUDIENCE=https://clickhouse-api
CLICKHOUSE_URL=http://localhost:8123
CLICKHOUSE_USER=auth0_user
```

---

## 🧠 Common ClickHouse Docker Issues 🔥

> 🛑 Docker container exits (code 91)?

- Check for missing `<enabled>1</enabled>` in `users.xml`
- Verify well-formed XML syntax
- Ensure correct path for volume mounts (especially `${PWD}` usage)
- ![image](https://github.com/user-attachments/assets/2fcf413e-6849-4103-8bb2-a15ca9daf18e)

#And
![image](https://github.com/user-attachments/assets/3ce03bd0-ff85-4c16-a800-bab48cf5cf16)


Fix these and you’re golden! 💡

---

## 🎉 BIFLUX is Ready!

If anything doesn’t work, or you’d like support running BIFLUX:

📧 **[souravkarmakar8927@gmail.com](mailto:souravkarmakar8927@gmail.com)**

