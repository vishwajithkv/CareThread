# CareThread

A healthcare monitoring dashboard for tracking patient observations, caretakers, and symptom-based alerts.

**Stack:** React + TypeScript + Vite + Tailwind CSS · FastAPI · PostgreSQL

---

## Prerequisites

Make sure the following are installed on your machine:

- [Node.js](https://nodejs.org/) (v18+)
- [Python](https://www.python.org/) (v3.10+)
- [PostgreSQL](https://www.postgresql.org/) (running locally)

---

## 1. Clone the Repository

```bash
git clone https://github.com/vishwajithkv/CareThread.git
cd CareThread
```

---

## 2. Database Setup

### Install PostgreSQL (Ubuntu / Debian)

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

### Start the PostgreSQL service

```bash
sudo systemctl start postgresql
sudo systemctl enable postgresql   # auto-start on reboot
```

### Open the PostgreSQL shell

On Linux, connect over TCP with `-h localhost` (avoids peer auth errors):

```bash
psql -h localhost -U postgres -d postgres
```

> **Password prompt:** if this is a fresh install, set the `postgres` user password first:
> ```bash
> sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD 'care123';"
> ```
> Then reconnect with `psql -h localhost -U postgres -d postgres`.

### Create the database

Once inside the psql shell, run:

```sql
CREATE DATABASE carethread;
GRANT ALL PRIVILEGES ON DATABASE carethread TO postgres;
\q
```

> Tables and seed data are created automatically when the backend starts for the first time — no migrations needed.

---

## Accessing the Database Later

To open the `carethread` database at any time:

```bash
psql -h localhost -U postgres -d carethread
```

Password: `care123`

### Useful psql commands

| Command | Description |
|---------|-------------|
| `\dt` | List all tables |
| `SELECT * FROM patient;` | View all patients |
| `SELECT * FROM caretaker;` | View all caretakers |
| `SELECT * FROM observation;` | View all logs |
| `\q` | Exit psql |

### Clear all user data

To wipe patients, caretakers, and observations and reset ID counters:

```sql
TRUNCATE TABLE observation, caretaker, patient RESTART IDENTITY CASCADE;
```

> `known_disease` (seed data) is left untouched.

---

## 3. Backend Setup

```bash
# From project root — create a virtual environment
python3 -m venv .venv

# Activate it
source .venv/bin/activate          # Linux / macOS
# .venv\Scripts\activate           # Windows

# Install dependencies
pip install -r backend/requirements.txt
```

### Run the Backend

```bash
cd backend
source ../.venv/bin/activate       # if not already active
uvicorn main:app --reload --port 8000
```

Backend will be live at **http://localhost:8000**  
Interactive API docs at **http://localhost:8000/docs**

---

## 4. Frontend Setup

Open a **new terminal** at the project root:

```bash
npm install
npm run dev
```

Frontend will be live at **http://localhost:5173**

---

## Quick Start (TL;DR)

```bash
# Terminal 1 — Backend
cd CareThread
python3 -m venv .venv && source .venv/bin/activate
pip install -r backend/requirements.txt
cd backend && uvicorn main:app --reload --port 8000

# Terminal 2 — Frontend
cd CareThread
npm install && npm run dev
```

---

## Project Structure

```
CareThread/
├── backend/
│   ├── main.py           # FastAPI app + CORS + router registration
│   ├── database.py       # PostgreSQL connection + table init + seeding
│   ├── requirements.txt
│   └── routes/
│       ├── patients.py   # GET / POST / DELETE /api/patients
│       ├── caretakers.py # GET / POST / DELETE /api/caretakers
│       ├── logs.py       # GET / POST /api/logs  (observations)
│       └── alerts.py     # GET /api/alerts  (pattern detection)
└── src/
    ├── App.tsx
    └── components/
        ├── Dashboard.tsx     # Patient selector + live stats + recent logs
        ├── AddPatient.tsx    # Form → POST /api/patients
        ├── AddCaretaker.tsx  # Form → POST /api/caretakers (patient dropdown from DB)
        ├── Log.tsx           # Form → POST /api/logs + recent logs list
        ├── Alert.tsx         # Alert page → GET /api/alerts per patient
        ├── AlertCard.tsx
        ├── LogCard.tsx
        ├── Navbar.tsx
        ├── Avatar.tsx
        ├── Button.tsx
        └── DashboardCard.tsx
```

---

## API Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/patients/` | List all patients |
| `POST` | `/api/patients/` | Add a patient |
| `DELETE` | `/api/patients/{id}` | Remove a patient |
| `GET` | `/api/caretakers/{patient_id}` | List caretakers for a patient |
| `POST` | `/api/caretakers/` | Add a caretaker |
| `GET` | `/api/logs/{patient_id}` | Get observations for a patient |
| `POST` | `/api/logs/` | Log a new observation |
| `GET` | `/api/alerts/{patient_id}` | Get pattern-based alerts for a patient |
