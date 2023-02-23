## 2/23/23



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
