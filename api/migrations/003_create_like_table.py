steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE likes (
            id SERIAL PRIMARY KEY NOT NULL,
            wine_id INTEGER NOT NULL REFERENCES wines(id) ON DELETE CASCADE,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            created_on TIMESTAMP
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE likes;
        """
    ]
]
