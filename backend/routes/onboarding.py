from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timezone
from database import get_db
from models import OnboardingTask, TaskProgress
from schemas import (
    OnboardingTaskOut, TaskStatusUpdate, ProgressSummary,
    PhaseGroup, OnboardingTasksResponse, TaskUpdateResponse,
)

router = APIRouter(prefix="/api/onboarding", tags=["onboarding"])

DEMO_NEW_HIRE_ID = 1

VALID_STATUSES = {"not_started", "in_progress", "done"}

PHASE_ORDER = ["before_day_1", "first_day", "first_week", "first_month"]
PHASE_TITLES = {
    "before_day_1": "Before Day 1",
    "first_day": "First Day",
    "first_week": "First Week",
    "first_month": "First Month",
}


def _get_progress_map(db: Session, new_hire_id: int) -> dict[int, str]:
    rows = db.query(TaskProgress).filter(TaskProgress.new_hire_id == new_hire_id).all()
    return {r.task_id: r.status for r in rows}


def _calculate_progress(db: Session, new_hire_id: int) -> ProgressSummary:
    tasks = db.query(OnboardingTask).all()
    total = len(tasks)
    progress_map = _get_progress_map(db, new_hire_id)

    done = sum(1 for s in progress_map.values() if s == "done")
    in_progress = sum(1 for s in progress_map.values() if s == "in_progress")
    not_started = total - done - in_progress

    return ProgressSummary(
        total=total,
        done=done,
        in_progress=in_progress,
        not_started=not_started,
        completion_percent=round(done / total * 100) if total > 0 else 0,
    )


@router.get("/tasks", response_model=OnboardingTasksResponse)
def get_tasks(db: Session = Depends(get_db)):
    tasks = db.query(OnboardingTask).order_by(OnboardingTask.id).all()
    progress_map = _get_progress_map(db, DEMO_NEW_HIRE_ID)

    # Group by phase
    phases_dict: dict[str, list[OnboardingTaskOut]] = {p: [] for p in PHASE_ORDER}
    for task in tasks:
        status = progress_map.get(task.id, "not_started")
        task_out = OnboardingTaskOut(
            id=task.id,
            title=task.title,
            description=task.description,
            phase=task.phase,
            priority=task.priority,
            estimated_minutes=task.estimated_minutes,
            owner_department=task.owner_department,
            status=status,
        )
        if task.phase in phases_dict:
            phases_dict[task.phase].append(task_out)

    phases = [
        PhaseGroup(phase=p, title=PHASE_TITLES[p], tasks=phases_dict[p])
        for p in PHASE_ORDER
        if phases_dict[p]
    ]

    progress = _calculate_progress(db, DEMO_NEW_HIRE_ID)

    return OnboardingTasksResponse(phases=phases, progress=progress)


@router.patch("/tasks/{task_id}/status", response_model=TaskUpdateResponse)
def update_task_status(task_id: int, body: TaskStatusUpdate, db: Session = Depends(get_db)):
    if body.status not in VALID_STATUSES:
        raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {VALID_STATUSES}")

    task = db.query(OnboardingTask).filter(OnboardingTask.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    # Find or create TaskProgress for this task + demo new hire
    tp = db.query(TaskProgress).filter(
        TaskProgress.task_id == task_id,
        TaskProgress.new_hire_id == DEMO_NEW_HIRE_ID,
    ).first()

    if tp:
        tp.status = body.status
        tp.updated_at = datetime.now(timezone.utc)
    else:
        tp = TaskProgress(
            task_id=task_id,
            new_hire_id=DEMO_NEW_HIRE_ID,
            status=body.status,
            updated_at=datetime.now(timezone.utc),
        )
        db.add(tp)

    db.commit()
    db.refresh(tp)

    # Build response
    progress_map = _get_progress_map(db, DEMO_NEW_HIRE_ID)
    task_out = OnboardingTaskOut(
        id=task.id,
        title=task.title,
        description=task.description,
        phase=task.phase,
        priority=task.priority,
        estimated_minutes=task.estimated_minutes,
        owner_department=task.owner_department,
        status=progress_map.get(task.id, "not_started"),
    )

    progress = _calculate_progress(db, DEMO_NEW_HIRE_ID)

    return TaskUpdateResponse(task=task_out, progress=progress)
