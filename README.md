# Meridian Compass

Meridian Compass is a full-stack onboarding web application designed to make the first month of work significantly less chaotic for new employees at Meridian, a fictional 200-employee hybrid IT company.

## Documentation
- [Assumptions](ASSUMPTIONS.md)
- [Decisions](DECISIONS.md)
- [What I Would Do Next](WHAT_I_WOULD_DO_NEXT.md)
- [Reflection](REFLECTION.md)

## Problem Statement
Starting a new job often involves scattered emails, confusing wikis, and feeling disconnected from colleagues. Meridian Compass solves this by giving new hires a centralized, friendly hub that answers four critical questions:
- What should I do?
- Who should I meet?
- Where should I go?
- Who can answer my questions?

## Main Features
- **Dashboard / Compass**: A welcoming home screen with next actions, progress summary, and suggested people to meet.
- **Meridian Journey**: A step-by-step checklist of onboarding tasks with real status updates synced to the backend.
- **Meridian Connect**: An employee directory featuring department, interest, and office-day filtering, along with simulated "Start conversation" chat popups and "Coffee chat" invites.
- **Office Explorer**: An interactive 3D/2D office map with clickable hotspots revealing room details and who typically sits where.
- **Ask Meridian**: A searchable FAQ and resource library with preset common questions.
- **HR View**: A dashboard for Meridian's sole HR manager to track new hire progress and prioritize actions.
- **Light/Night Mode**: A fully supported UI theme toggle.
- **Offline Fallback**: The frontend gracefully falls back to mock data if the backend is unavailable.

## Tech Stack
- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Lucide React
- **Backend**: Python, FastAPI, SQLite, SQLAlchemy, Pydantic
- **Testing**: Playwright (E2E smoke tests)

## Project Structure
This is a monorepo containing:
- `frontend/`: The React + Vite application
- `backend/`: The Python + FastAPI application

## Running the Project

### Clone the Repository
First, clone the repository to your local machine:
```bash
git clone https://github.com/saftanoel/qubiz-meridian-project.git
cd qubiz-meridian-project
```

### Backend
The backend uses a local SQLite database that is automatically seeded on startup.

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 -m uvicorn main:app --reload
```
*The backend runs on `http://127.0.0.1:8000`.*

> **Tip**: For a clean demo state, you can reset the database by deleting `backend/meridian.db` before starting the server.

### Frontend
```bash
cd frontend
npm install
npm run dev
```
*The frontend runs on `http://localhost:5173`.*

**Environment Variables**
The API base URL can be configured in a `.env` file (see `frontend/.env.example`):
```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

### Build
```bash
cd frontend
npm run build
```

### Playwright E2E Tests
Make sure both the frontend and backend servers are running before executing tests.
```bash
cd frontend
npm run test:e2e
```

## Demo Context
- The app is pre-configured with **George** as the demo new hire. 
- You can toggle between the **New Hire** view and the **HR View** using the role switcher in the bottom-left corner of the sidebar.


## Known Limitations
- The "Start conversation" chat popup stores messages locally in the browser rather than in the backend.
- There is no real Slack or Google Meet integration; buttons simulate the experience for MVP purposes.
- The Office Explorer uses static 3D/2D rendered images with HTML hotspots rather than a WebGL 3D engine.
- Ask Meridian is a static, searchable FAQ, not a generative AI agent.

## Future Improvements
Future iterations would introduce a real AI assistant for Ask Meridian, a fully interactive 3D office game, smarter employee matching based on current tasks, and real user authentication. (See `WHAT_I_WOULD_DO_NEXT.md` for details).
