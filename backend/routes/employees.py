from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session, joinedload
from database import get_db
from models import Employee
from schemas import EmployeeOut, SuggestedPersonOut

router = APIRouter(prefix="/api", tags=["employees"])


@router.get("/employees", response_model=list[EmployeeOut])
def get_employees(db: Session = Depends(get_db)):
    employees = (
        db.query(Employee)
        .options(
            joinedload(Employee.interests),
            joinedload(Employee.office_days),
            joinedload(Employee.usual_location)
        )
        .all()
    )
    return employees


@router.get("/employees/matches", response_model=list[SuggestedPersonOut])
def get_employee_matches(db: Session = Depends(get_db)):
    """Return suggested people to meet this week.
    Prioritizes the onboarding buddy, then employees from the same department
    or with overlapping office days.
    """
    employees = (
        db.query(Employee)
        .options(
            joinedload(Employee.interests),
            joinedload(Employee.office_days),
            joinedload(Employee.usual_location)
        )
        .all()
    )

    # Sort: buddy first, then by id
    sorted_emps = sorted(employees, key=lambda e: (not e.is_buddy, e.id))

    results = []
    for emp in sorted_emps[:3]:
        initials = "".join(w[0] for w in emp.name.split())[:2]
        results.append(SuggestedPersonOut(
            id=emp.id,
            name=emp.name,
            role=emp.role,
            department=emp.department,
            reason=emp.match_reason or "",
            initials=initials,
            avatar_url=emp.avatar_url,
        ))

    return results
