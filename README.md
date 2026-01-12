# 🎥 DjangoTube - React API Version + Observability Stack 🚀

The modern version of the DjangoTube project. Built with **Django REST Framework (API)** and **React (UI)**, now featuring a full **Observability Stack** with Prometheus and Grafana for real-time monitoring.

This repository contains the modern, "decoupled" version of DjangoTube:
* **backend/**: The Django REST Framework API handles all data, authentication, business logic, and metrics export.
* **frontend/**: The React application consumes the API to render the user interface and manage user interactions.
* **monitoring/**: Prometheus and Grafana configurations for real-time system tracking.
---

## 🛠️ Tech Stack

### 🐳 Containerization
* **Docker / Docker Compose** (Full stack orchestration)

### 🔙 Backend
* **Python / Django**
* **Django REST Framework (DRF)**
* **DRF Simple JWT** (Token Authentication)
* **Django CORS Headers** (Cross-origin requests)
* **django-prometheus** (Metrics export)
* **SQLite3**

### ⚛️ Frontend
* **React**
* **React Router DOM**
* **React Context API** (Global Auth State)
* **Axios** (API Requests)
* **CSS3 / Tailwind**

### 📊 Monitoring & Observability (NEW!)
* **Prometheus:** Time-series database for collecting system and custom metrics.
* **Grafana:** Visualization dashboard for analyzing user behavior (Video Views) and system health.

---

## 🚀 Getting Started (Recommended Method: Docker)

The easiest way to set up and run the entire Full-Stack application (including the Monitoring Stack) is by using **Docker Compose**. This method handles all environment setups and dependencies in a single step.

### Prerequisites
* **Docker Desktop** (Installed and Running)

### 1. Run the Project (One Command)
Navigate to the root directory of the project (where `docker-compose.yml` is located) and run:

```bash
docker-compose up --build
```

### 2. Access the Application
Once the services are running, you can access the platform via these URLs:

| Service | Description | URL |
| :--- | :--- | :--- |
| **Frontend** | React User Interface | http://localhost:3000 |
| **Backend** | Django API Root | http://localhost:8000 |
| **Grafana** | Visualization Dashboard | http://localhost:3001 |
| **Prometheus** | Metrics Collector | http://localhost:9090 |
| **Raw Metrics** | Django Metrics Endpoint | http://localhost:8000/prometheus/metrics |

*(Note: Default Grafana login is usually `admin` / `admin`)*

**Useful Docker Commands:**
* **Start in background:** `docker-compose up -d`
* **Stop & remove containers:** `docker-compose down`

---

## ⚙️ Manual Installation (Development Mode)

If you prefer running services individually without Docker:

### 1. Backend Setup
```bash
# 1. Navigate into the backend
cd backend

# 2. Create and activate a virtual environment
# Windows:
python -m venv venv
.\venv\Scripts\activate
# macOS / Linux:
# python3 -m venv venv
# source venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Apply database migrations
python manage.py migrate

# 5. Run the backend server
python manage.py runserver
```

### 2. Frontend Setup
```bash
# 1. Navigate into the frontend folder (Open a new terminal)
cd frontend

# 2. Install dependencies
npm install

# 3. Run the frontend development server
npm start
```

### 📈 Monitoring Features
This project includes a custom "Video View Counter" metric.

* Every time a user views a video detail page, the backend increments a Prometheus counter (video_views_total).
* This data is visualized in Grafana to track popular content in real-time.



📄 License
This project is licensed under the MIT License - see the LICENSE file for details. Copyright (c) 2025 YusufTufan
