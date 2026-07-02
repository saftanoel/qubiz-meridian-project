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

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
source venv/bin/activate
# Note: If your virtual environment is named .venv, use `source .venv/bin/activate` instead
pip install -r requirements.txt
uvicorn main:app --reload
```
