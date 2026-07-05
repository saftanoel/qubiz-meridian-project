import json
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session, joinedload
from database import get_db
from models import OfficeLocation
from schemas import OfficeLocationOut

router = APIRouter(prefix="/api", tags=["office"])


@router.get("/office-locations", response_model=list[OfficeLocationOut])
def get_office_locations(db: Session = Depends(get_db)):
    locations = db.query(OfficeLocation).options(joinedload(OfficeLocation.employees)).order_by(OfficeLocation.id).all()

    results = []
    for loc in locations:
        tips = []
        if loc.tips:
            try:
                tips = json.loads(loc.tips)
            except json.JSONDecodeError:
                tips = [loc.tips]

        results.append(OfficeLocationOut(
            id=loc.id,
            name=loc.name,
            description=loc.description,
            tips=tips,
            who_you_can_meet=loc.who_you_can_meet,
            why_it_matters=loc.why_it_matters,
            people=[{
                "id": emp.id,
                "name": emp.name,
                "role": emp.role,
                "department": emp.department,
                "avatar_url": emp.avatar_url
            } for emp in loc.employees]
        ))

    return results
