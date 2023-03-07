## 3/6/23

Today we added the delete funtion to the user account. We created a modal to ask the user to confirm the deletion and updated the modal slice to allow the modal to work. We then set up a websocket to work with the comment sections. We then set up a search bar to filter through the wines. We did some styling to finish off the day.

## 3/3/23

We worked on writing our unit tests today. I had a little trouble because I picked the create account endpoint to test. The login aspect of that endpoint was causing issues so I switched to coding a test for the create like endpoint. Afterwards we focused on styling the page.

## 3/2/23

Unfortunately, I was still sick today. Good news is I'm better now.

## 3/1/23

Was out sick again today. I ran flake8 and cleaned up all of the style errors.

## 2/28/23

For the first part of the day Malcolm and I worked on building and styling the home page. We got it looking pretty nice. I was feeling sick so I was not present for the rest of the day. Worked on configuring all of our CI/CD stuff to prepare for next week.

## 2/27/23

Worked on trying to get the like counter to function properly when multiple users like the same wine. We had to refactor the function defined in the WineCard.js to do this. We got that working then worked on the style of our pages.

## 2/24/23

Worked on some styling for the first part of the day. Tried to set up a redux slice for our wine data, but are running into issues with our specific implementation of it. We worked with Jimmy and tried a bunch of different solutions out. In the end, we solved the problem but did not need to do anything involving our Redux code.

## 2/23/23

Continued working on our Redux code. Today we set up a reducer for getting data from the likes API as well as the wines API. Started to work on building out the pages and did some minor styling with tailwind css.

## 2/22/23

Worked on more Redux today. Tried to fix a bug with the update_user reducer path. I was feeling sick in the afternoon, so I took the rest of the day off.

## 2/21/23

Today we got started working with Redux. So far, we have it set up to get data from our API endpoints for the token and user data. We appear to have the front-end authentication working, though I'd like to test it further. Redux is kind of confusing but I think I've begun to get a handle on it.

## 2/15/23

We got a lot done today. Today we paired off with Malcolm and I working on the wines and comments and Maddy and Scott working on the users and likes. We completed all the necessary API endpoints for the comments and wines. The wines will now require a logged in user to be able to view, edit, create, or delete them. The comments and likes tables have references to both the wines and users tables. Everything appears to be working as intended, but we'll do some further tests tomorrow. We are pretty close to being done with our backend functionality.

## 2/14/23

Today we worked on the authentication. After a while of running into issues with the implemention we got evrything working. Part of the issues related to integrating the authentication into our already built user classes and queries. We got the bare bones authentication working then attemted to integrate parameters from our original user class back into the tables and models. Though we did run into troulbe when trying to use time and datetime data types for the parameters. We weren't quite sure why they weren't working in in this specific situation. But we did get the authentication working and implemented the the authentication check on our wine object queries.

## 2/13/23

Today we worked through the API endpoints for the user models.  We worked through the code together and figured out how to get the endpoints working and sending the proper responses.  We did some trouble-shooting with docker for Maddy and Scott because apparently the new apple M1 and M2 chips have issues with dealing with cross-platform projects. I'm feeling less intimidated by FastAPI after today.

## 2/10/23

We finalized our wireframing and studied FastAPI through the docs and videos on learn. We also spent some time team-building and getting to know each other better.

## 2/9/23

We worked on finalizing the wireframing and discussed whether we should handle like count on the front-end or back-end. We decided to use a count variable as part of the wine entity. We also finalized a draft of our api-design.
