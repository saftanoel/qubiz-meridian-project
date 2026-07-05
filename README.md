# Meridian Compass

Meridian Compass is a web application designed to make the first month of onboarding significantly less chaotic for new employees at a 200-employee hybrid company.

## Project Structure

This is a monorepo containing:
- `frontend/`: React + TypeScript + Vite frontend.
- `backend/`: Python + FastAPI backend.

## Features (MVP)
- **Dashboard / Compass**: Welcome card, next actions, progress.
- **Meridian Journey**: 30-day onboarding checklist.
- **Meridian Connect**: Employee directory with filters and interests.
- **Meridian Office Explorer**: Interactive office map.
- **Ask Meridian**: FAQ section.
- **HR View**: Overview for HR personnel.

## Running Locally

### Backend
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
python3 -m uvicorn main:app --reload
```
*The backend runs on `http://127.0.0.1:8000`.*

### Frontend
```bash
cd frontend
npm install
npm run dev
```
*The frontend runs on `http://localhost:5173`.*
*The API base URL can be configured with `VITE_API_BASE_URL` in an `.env` file (see `frontend/.env.example`).*

## Running E2E Tests

E2E smoke tests use [Playwright](https://playwright.dev/) and require both servers running.

> **Tip:** For consistent results, delete `backend/meridian.db` before starting the backend so seed data is fresh.

### 1. Start the backend
```bash
cd backend
source venv/bin/activate
python3 -m uvicorn main:app --reload
```

### 2. Start the frontend
```bash
cd frontend
npm run dev
```

### 3. Run tests
```bash
cd frontend
npm run test:e2e
```

### Optional modes
```bash
npm run test:e2e:ui       # Interactive Playwright UI
npm run test:e2e:headed   # Run in a visible browser
```

