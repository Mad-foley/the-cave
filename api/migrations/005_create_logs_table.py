steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE logs (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            created_on TIMESTAMP,
            note VARCHAR(1000) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE comments;
        """
    ]
]
