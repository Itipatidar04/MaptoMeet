from geoalchemy2.elements import WKTElement
from sqlalchemy.orm import Session

from app.database.session import SessionLocal
from app.models.category import Category
from app.models.place import Place


def seed_data():
    db: Session = SessionLocal()

    try:
        # Create category
        category = Category(
            name="Cafe",
            slug="cafe"
        )

        db.add(category)
        db.commit()
        db.refresh(category)

        print("Category inserted successfully.")

        # Create place with POINT geometry
        place = Place(
            name="Sample Cafe",
            category_id=category.id,
            address="Vijay Nagar, Indore",
            price_level=2,
            rating=4.5,
            timings={
                "open": "09:00",
                "close": "23:00"
            },
            geom=WKTElement(
                "POINT(75.8937 22.7533)",
                srid=4326
            )
        )

        db.add(place)
        db.commit()
        db.refresh(place)

        print("Place inserted successfully.")

        print("\nInserted Place:")
        print(place.name)
        print(place.address)

    except Exception as e:
        db.rollback()
        print("Insert failed.")
        print(e)

    finally:
        db.close()


if __name__ == "__main__":
    seed_data()
