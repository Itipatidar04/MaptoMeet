from sqlalchemy import inspect

from app.database.session import engine


def validate_tables():
    inspector = inspect(engine)

    tables = inspector.get_table_names()

    print("\nTables found in database:")
    print(tables)

    for table in tables:
        print(f"\nColumns in '{table}':")

        columns = inspector.get_columns(table)

        for column in columns:
            print(
                f"  {column['name']} -> {column['type']}"
            )



if __name__ == "__main__":
    validate_tables()
