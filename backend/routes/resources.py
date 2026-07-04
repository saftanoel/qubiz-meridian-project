from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_
from database import get_db
from models import Resource
from schemas import ResourceOut

router = APIRouter(prefix="/api", tags=["resources"])


@router.get("/resources", response_model=list[ResourceOut])
def get_resources(db: Session = Depends(get_db)):
    return db.query(Resource).order_by(Resource.id).all()


@router.get("/resources/search", response_model=list[ResourceOut])
def search_resources(q: str = Query("", min_length=0), db: Session = Depends(get_db)):
    if not q.strip():
        return db.query(Resource).order_by(Resource.id).all()

    pattern = f"%{q}%"
    results = (
        db.query(Resource)
        .filter(
            or_(
                Resource.question.ilike(pattern),
                Resource.answer.ilike(pattern),
                Resource.category.ilike(pattern),
            )
        )
        .order_by(Resource.id)
        .all()
    )
    return results
