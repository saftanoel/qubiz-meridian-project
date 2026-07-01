from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from .database import Base

# Placeholders for future models
# class Employee(Base):
#     __tablename__ = "employees"
#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String, index=True)
#     role = Column(String)
