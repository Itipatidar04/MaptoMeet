from sqlalchemy import text

from app.database.session import engine


def test_connection():
    try:
        with engine.connect() as connection:
            result = connection.execute(
                text("SELECT version();")
            )

            print("Database connected successfully.\n")

            for row in result:
                print(row)

    except Exception as e:
        print("Database connection failed.")
        print(e)


if __name__ == "__main__":
    test_connection()
