from app.models import Base, Category, Place


def test_models():
    print("Models imported successfully.")

    print("Registered tables:")
    print(Base.metadata.tables.keys())

    category = Category(
        name="restaurant",
        slug="restaurant"
    )

    print("Category object created:")
    print(category)

    place = Place(
        name="Sample Cafe"
    )

    print("Place object created:")
    print(place)

    print("Relationship test passed.")


if __name__ == "__main__":
    test_models()
