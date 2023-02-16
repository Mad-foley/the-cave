steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(50) NOT NULL,
            username VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(1000) NOT NULL,
            birthday DATE,
            image_url VARCHAR(1000),
            modified_on TIMESTAMP,
            created_on TIMESTAMP
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE users;
        """
    ]
]
