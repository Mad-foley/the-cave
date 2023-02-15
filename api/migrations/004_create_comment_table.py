steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE comments (
            id SERIAL PRIMARY KEY NOT NULL,
            wine_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            created_on TIMESTAMP,
            comment VARCHAR(1000) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE comments;
        """
    ]
]
