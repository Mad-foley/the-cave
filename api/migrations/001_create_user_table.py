steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(1000) NOT NULL,
            username VARCHAR(1000) UNIQUE NOT NULL,
            password VARCHAR(1000) NOT NULL,
            birthday VARCHAR(1000) NOT NULL,
            picture_url VARCHAR(1000),
            email VARCHAR(1000)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE users;
        """
    ]
]
