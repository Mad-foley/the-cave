steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE wines (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(50) NOT NULL,
            location VARCHAR(50),
            varietal VARCHAR(50),
            winery VARCHAR(50),
            image_url VARCHAR(1000),
            vintage VARCHAR(50),
            created_on TIMESTAMP,
            modified_on TIMESTAMP
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE wines;
        """
    ]
]
