# Project CAVEMAN

- Scott Bustos
- Maddy Foley
- Kyle Merckx
- Malcolm Pei

Project cave lets your curate a collection of wines

## Design

- [API design](docs/api-design.md)
- [Wireframe](docs/wireframe-design.png)

## Intended market

This application is designed for anyone interested in collecting wines. Novices to professional collectors are welcome to use our service to keep a organized data set of their collection.

## Functionality

- Visitors to the site can create a collection of wines.
- Users can get recommendations by choose a type of wine they are interested in.
- Collection page for a list view of all products
- Accounts page:
  - Information on the users activity on the application
  - Quick link to their wines
  - Quick link to their favorites


## Project Initialization

To fully enjoy this application on your local machine, please make sure to follow these steps:

1. Clone the repository down to your local machine
2. CD into the new project directory
3. Run `docker volume create wine-data`
4. Run `docker compose build`
5. Run `docker compose up`
6. Run `docker exec -it module3-project-gamma-api-1 bash`
7. Run `python load-data.py`
8. Exit the container's CLI, and enjoy la Cave!
