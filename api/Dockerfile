FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip
WORKDIR /app

COPY requirements.txt requirements.txt
COPY authenticator.py authenticator.py
COPY load-data.py load-data.py
COPY main.py main.py

COPY models models
COPY queries queries
COPY routers routers
COPY data data
COPY migrations migrations
COPY tests tests

RUN python -m pip install -r requirements.txt

CMD python -m migrations up && uvicorn main:app --host 0.0.0.0
