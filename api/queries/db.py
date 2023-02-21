from psycopg_pool import ConnectionPool
import os

# Connect to the database
pool = ConnectionPool(conninfo=os.environ.get('DATABASE_URL'))
