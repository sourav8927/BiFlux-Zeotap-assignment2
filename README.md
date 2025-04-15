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
- npm install

### 📄 Create a .env file in the backend directory:
- PORT=5000

### ▶️ Start the Backend Server:
- nodemon server.js
- The backend server will run on: http://localhost:5000

### 🌐 Frontend Setup
- cd .\BIFLUX-client\
- npm install
### ▶️ Start the Frontend App:
- npm run dev
- The frontend will be accessible at: http://localhost:port
