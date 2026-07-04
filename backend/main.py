from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import init_db

from routes.dashboard import router as dashboard_router
from routes.onboarding import router as onboarding_router
from routes.employees import router as employees_router
from routes.resources import router as resources_router
from routes.office import router as office_router
from routes.hr import router as hr_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: create tables and seed data
    init_db()
    yield
    # Shutdown: nothing to clean up


app = FastAPI(title="Meridian Compass API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register route modules
app.include_router(dashboard_router)
app.include_router(onboarding_router)
app.include_router(employees_router)
app.include_router(resources_router)
app.include_router(office_router)
app.include_router(hr_router)


@app.get("/")
def read_root():
    return {"message": "Welcome to the Meridian Compass API"}


@app.get("/api/health")
def health_check():
    return {"status": "healthy"}
