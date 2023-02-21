## Project Documentation

My Cave is a personal project with the aim of creating a social network surrounding the love of wines

Features:
```
- Register an account
- Create a collection of wines
- Share collections
- Comment on collections
```

## Public API endpoints
##### Sample API Wines
- https://api.sampleapis.com/wines/reds
- https://api.sampleapis.com/wines/whites
- https://api.sampleapis.com/wines/rose
- https://api.sampleapis.com/wines/sparkling
- https://api.sampleapis.com/wines/dessert
- https://api.sampleapis.com/wines/port
##### Ultimate Wine API
- https://zylalabs.com/api/1201/the+ultimate+wine+api/1047/get+wine?query=cement
    - API key necessary
    - query necessary

## Public API Implementations
##### Sample API Wines
```
Users normally create their own wine data to save into their collection

But with this public API we can offer the feature of saving public wines into their collection

We do this by creating a unique page for the Sample API Wines.
The page has buttons for each wines that acts as a form to add a wine into the database.

To be specific, the values of the normal "create a wine" form are automatically taken
from the public API results and the user only has to press the save button.

This will save the data into our database and generate a unique ID for us to reference

Multiple users will have the ability to save the same wine data, for they each have their own unique ID

Once saved into our database, we can populate the rest of the application with the new added wine
```
##### Ultimate Wine API - Food Pairing
```
Users can query the public API for 3 suggestions.
The result will be filtered through our database to find any wines matching the description

If it does, it replaces the suggestion with a wine from our database

For each replacement of suggestion, the user can now save those wines into their collection as
data comes from our database

This basically becomes a random wine generator for the user
```
