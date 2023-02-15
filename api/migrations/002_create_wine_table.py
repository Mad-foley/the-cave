steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE wines (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL,
            location VARCHAR(1000),
            varietal VARCHAR(1000),
            winery VARCHAR(1000),
            image_url VARCHAR(1000),
            vintage VARCHAR(1000),
            created_on TIMESTAMP,
            modified_on TIMESTAMP,
            created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE wines;
        """
    ]
]
