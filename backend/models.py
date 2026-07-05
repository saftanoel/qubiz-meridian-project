from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, Text
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime, timezone


class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    role = Column(String, nullable=False)
    department = Column(String, nullable=False)
    avatar_url = Column(String, nullable=True)
    is_buddy = Column(Boolean, default=False)
    match_reason = Column(Text, nullable=True)
    ask_me_about = Column(Text, nullable=True)
    usual_location_id = Column(Integer, ForeignKey("office_locations.id"), nullable=True)

    interests = relationship("EmployeeInterest", back_populates="employee", cascade="all, delete-orphan")
    office_days = relationship("EmployeeOfficeDay", back_populates="employee", cascade="all, delete-orphan")
    usual_location = relationship("OfficeLocation", back_populates="employees")

    @property
    def usual_location_name(self):
        return self.usual_location.name if self.usual_location else None


class EmployeeInterest(Base):
    __tablename__ = "employee_interests"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id"), nullable=False)
    interest = Column(String, nullable=False)

    employee = relationship("Employee", back_populates="interests")


class EmployeeOfficeDay(Base):
    __tablename__ = "employee_office_days"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id"), nullable=False)
    day = Column(String, nullable=False)

    employee = relationship("Employee", back_populates="office_days")


class OnboardingTask(Base):
    __tablename__ = "onboarding_tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    phase = Column(String, nullable=False)  # before_day_1, first_day, first_week, first_month
    priority = Column(String, nullable=False)  # low, medium, high
    estimated_minutes = Column(Integer, nullable=True)
    owner_department = Column(String, nullable=True)

    progress = relationship("TaskProgress", back_populates="task", cascade="all, delete-orphan")


class TaskProgress(Base):
    __tablename__ = "task_progress"

    id = Column(Integer, primary_key=True, index=True)
    task_id = Column(Integer, ForeignKey("onboarding_tasks.id"), nullable=False)
    new_hire_id = Column(Integer, ForeignKey("new_hires.id"), nullable=False)
    status = Column(String, nullable=False, default="not_started")  # not_started, in_progress, done
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    task = relationship("OnboardingTask", back_populates="progress")
    new_hire = relationship("NewHire", back_populates="task_progress")


class Resource(Base):
    __tablename__ = "resources"

    id = Column(Integer, primary_key=True, index=True)
    question = Column(Text, nullable=False)
    answer = Column(Text, nullable=False)
    category = Column(String, nullable=False)


class OfficeLocation(Base):
    __tablename__ = "office_locations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    tips = Column(Text, nullable=True)  # JSON string: ["tip1", "tip2"]
    who_you_can_meet = Column(Text, nullable=True)
    why_it_matters = Column(Text, nullable=True)

    employees = relationship("Employee", back_populates="usual_location")


class HrActionItem(Base):
    __tablename__ = "hr_action_items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    severity = Column(String, nullable=False)  # info, warning, urgent
    action_label = Column(String, nullable=True)
    status = Column(String, nullable=False, default="open")  # open, resolved


class NewHire(Base):
    __tablename__ = "new_hires"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    role = Column(String, nullable=False)
    department = Column(String, nullable=False)
    start_date = Column(String, nullable=False)
    buddy_name = Column(String, nullable=True)
    status = Column(String, nullable=False, default="on_track")  # on_track, needs_attention

    task_progress = relationship("TaskProgress", back_populates="new_hire", cascade="all, delete-orphan")
