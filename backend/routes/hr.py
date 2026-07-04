from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import NewHire, HrActionItem, OnboardingTask, TaskProgress
from schemas import (
    HrOverviewResponse, HrStatsOut, NewHireOut,
    HrActionItemOut, ActionItemStatusUpdate,
)

router = APIRouter(prefix="/api/hr", tags=["hr"])

VALID_STATUSES = {"open", "resolved"}


def _calculate_hire_progress(db: Session, new_hire_id: int) -> int:
    """Calculate progress percentage for a specific new hire."""
    total = db.query(OnboardingTask).count()
    if total == 0:
        return 0

    done = (
        db.query(TaskProgress)
        .filter(TaskProgress.new_hire_id == new_hire_id, TaskProgress.status == "done")
        .count()
    )
    return round(done / total * 100)


@router.get("/overview", response_model=HrOverviewResponse)
def get_hr_overview(db: Session = Depends(get_db)):
    # New hires
    hires = db.query(NewHire).order_by(NewHire.id).all()

    new_hires_out = []
    progress_values = []
    missing_buddies = 0

    for hire in hires:
        progress = _calculate_hire_progress(db, hire.id)
        progress_values.append(progress)

        if not hire.buddy_name:
            missing_buddies += 1

        new_hires_out.append(NewHireOut(
            id=hire.id,
            name=hire.name,
            role=hire.role,
            department=hire.department,
            start_date=hire.start_date,
            buddy_name=hire.buddy_name,
            status=hire.status,
            progress=progress,
        ))

    # Stats
    avg_progress = round(sum(progress_values) / len(progress_values)) if progress_values else 0

    # Count overdue tasks (tasks in first_day or before_day_1 phase that are not done for hires with needs_attention)
    overdue = 0
    for hire in hires:
        if hire.status == "needs_attention":
            attention_tasks = (
                db.query(TaskProgress)
                .filter(
                    TaskProgress.new_hire_id == hire.id,
                    TaskProgress.status != "done",
                )
                .count()
            )
            overdue += attention_tasks

    # Pending check-ins (action items with status = open)
    pending_checkins = db.query(HrActionItem).filter(HrActionItem.status == "open").count()

    stats = HrStatsOut(
        new_hires_this_month=len(hires),
        average_onboarding_progress=avg_progress,
        missing_buddy_assignments=missing_buddies,
        overdue_tasks=overdue,
        pending_checkins=pending_checkins,
    )

    # Action items
    action_items = db.query(HrActionItem).order_by(HrActionItem.id).all()
    action_items_out = [
        HrActionItemOut(
            id=item.id,
            title=item.title,
            description=item.description,
            severity=item.severity,
            action_label=item.action_label,
            status=item.status,
        )
        for item in action_items
    ]

    return HrOverviewResponse(
        stats=stats,
        new_hires=new_hires_out,
        action_items=action_items_out,
    )


@router.patch("/action-items/{action_item_id}", response_model=HrActionItemOut)
def update_action_item(action_item_id: int, body: ActionItemStatusUpdate, db: Session = Depends(get_db)):
    if body.status not in VALID_STATUSES:
        raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {VALID_STATUSES}")

    item = db.query(HrActionItem).filter(HrActionItem.id == action_item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Action item not found")

    item.status = body.status
    db.commit()
    db.refresh(item)

    return HrActionItemOut(
        id=item.id,
        title=item.title,
        description=item.description,
        severity=item.severity,
        action_label=item.action_label,
        status=item.status,
    )
