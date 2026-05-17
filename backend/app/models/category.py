from __future__ import annotations

from uuid import UUID as PyUUID, uuid4

from sqlalchemy import String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base


class Category(Base):
    __tablename__ = "categories"

    id: Mapped[PyUUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid4
    )

    name: Mapped[str] = mapped_column(
        String,
        unique=True,
        nullable=False
    )

    slug: Mapped[str | None] = mapped_column(
        String,
        unique=True,
        nullable=True
    )

    places: Mapped[list["Place"]] = relationship(
        back_populates="category"
    )
