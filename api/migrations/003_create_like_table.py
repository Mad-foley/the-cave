steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE likes (
            id SERIAL PRIMARY KEY NOT NULL,
            wine_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            created_on TIMESTAMP
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE likes;
        """
    ]
]
