steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(50) NOT NULL,
            username VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(50) NOT NULL,
            birthday DATE,
            picture_url VARCHAR(1000),
            email VARCHAR(255),
            created_on TIMESTAMP,
            last_login TIMESTAMP
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE users;
        """
    ]
]
