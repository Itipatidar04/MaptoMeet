from __future__ import annotations

from uuid import UUID as PyUUID, uuid4
from decimal import Decimal
from datetime import datetime

from geoalchemy2 import Geometry
from sqlalchemy import (
    String,
    Integer,
    DECIMAL,
    ForeignKey,
    JSON,
    CheckConstraint,
    TIMESTAMP,
    func
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base


class Place(Base):
    __tablename__ = "places"

    __table_args__ = (
        CheckConstraint("price_level BETWEEN 1 AND 4"),
        CheckConstraint("rating >= 0 AND rating <= 5"),
    )

    id: Mapped[PyUUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid4
    )

    name: Mapped[str] = mapped_column(
        String,
        nullable=False
    )

    category_id: Mapped[PyUUID | None] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("categories.id", ondelete="SET NULL"),
        nullable=True
    )

    address: Mapped[str | None] = mapped_column(
        String,
        nullable=True
    )

    price_level: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True
    )

    rating: Mapped[Decimal | None] = mapped_column(
        DECIMAL(3, 2),
        nullable=True
    )

    timings: Mapped[dict | None] = mapped_column(
        JSON,
        nullable=True
    )

    geom: Mapped[str] = mapped_column(
        Geometry(geometry_type="POINT", srid=4326),
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        TIMESTAMP(timezone=True),
        server_default=func.now()
    )

    category: Mapped["Category"] = relationship(
        back_populates="places"
    )
