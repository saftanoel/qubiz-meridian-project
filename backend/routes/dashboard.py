from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import OnboardingTask, TaskProgress, Employee, EmployeeInterest, EmployeeOfficeDay
from schemas import (
    DashboardResponse, DashboardNewHireOut, NextActionOut,
    ProgressSummary, SuggestedPersonOut, UpcomingOfficeDayOut,
)

router = APIRouter(prefix="/api", tags=["dashboard"])

DEMO_NEW_HIRE_ID = 1

# Phase label mapping
PHASE_LABELS = {
    "before_day_1": "Before Day 1",
    "first_day": "First Day",
    "first_week": "First Week",
    "first_month": "First Month",
}


def _calculate_progress(db: Session, new_hire_id: int) -> ProgressSummary:
    """Calculate progress summary from task_progress rows."""
    tasks = db.query(OnboardingTask).all()
    total = len(tasks)

    progress_map = {}
    progress_rows = db.query(TaskProgress).filter(TaskProgress.new_hire_id == new_hire_id).all()
    for p in progress_rows:
        progress_map[p.task_id] = p.status

    done = sum(1 for s in progress_map.values() if s == "done")
    in_progress = sum(1 for s in progress_map.values() if s == "in_progress")
    not_started = total - done - in_progress

    completion_percent = round(done / total * 100) if total > 0 else 0

    return ProgressSummary(
        total=total,
        done=done,
        in_progress=in_progress,
        not_started=not_started,
        completion_percent=completion_percent,
    )


@router.get("/dashboard", response_model=DashboardResponse)
def get_dashboard(db: Session = Depends(get_db)):
    # New hire info (hardcoded to match frontend employeeData)
    new_hire = DashboardNewHireOut(
        name="George",
        full_name="Safta George-Manuel",
        start_date="2026-07-07",
        role="Software Engineer",
        department="Engineering",
    )

    # Next actions — first 3 incomplete tasks for the demo new hire
    tasks = db.query(OnboardingTask).order_by(OnboardingTask.id).all()
    progress_map = {}
    progress_rows = db.query(TaskProgress).filter(TaskProgress.new_hire_id == DEMO_NEW_HIRE_ID).all()
    for p in progress_rows:
        progress_map[p.task_id] = p.status

    tones = ["peach", "teal", "sky"]
    next_actions = []
    for task in tasks:
        status = progress_map.get(task.id, "not_started")
        if status != "done" and len(next_actions) < 3:
            tone = tones[len(next_actions) % 3]
            meta = f"{task.estimated_minutes} min · {task.owner_department}"
            next_actions.append(NextActionOut(
                id=task.id,
                title=task.title,
                meta=meta,
                tone=tone,
                completed=False,
            ))

    # Progress summary
    progress = _calculate_progress(db, DEMO_NEW_HIRE_ID)

    # Suggested people (first 3 employees)
    employees = db.query(Employee).limit(3).all()
    suggested_people = []
    for emp in employees:
        initials = "".join(w[0] for w in emp.name.split())[:2]
        suggested_people.append(SuggestedPersonOut(
            id=emp.id,
            name=emp.name,
            role=emp.role,
            department=emp.department,
            reason=emp.match_reason or "",
            initials=initials,
            avatar_url=emp.avatar_url,
        ))

    # Upcoming office days (hardcoded to match frontend)
    upcoming_office_days = [
        UpcomingOfficeDayOut(day="Mon", date="Jul 7", label="Your first day", tone="peach"),
        UpcomingOfficeDayOut(day="Wed", date="Jul 9", label="Team anchor day", tone="teal"),
        UpcomingOfficeDayOut(day="Thu", date="Jul 10", label="Team anchor day", tone="teal"),
        UpcomingOfficeDayOut(day="Fri", date="Jul 11", label="Remote — demo day", tone="sky"),
    ]

    return DashboardResponse(
        new_hire=new_hire,
        today_next_actions=next_actions,
        progress_summary=progress,
        suggested_people=suggested_people,
        upcoming_office_days=upcoming_office_days,
    )
