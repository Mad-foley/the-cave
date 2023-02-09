### Get a list of wines

* Endpoint path: /wines
* Endpoint method: GET
* Query parameters:
  * «name»: «purpose»

* Headers:
  * Authorization: Bearer token

* Response: A list of wines
* Response shape (JSON):
    ```json
    {
      "wines": [
        {
        "wine_name": string,
        "winery": string,
        "image_url": string,
        "likes": integer,
        }
      ]
    }
    ```

### Creates a new wine listing

* Endpoint path: /wines
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
     ```json
    {
        "wine_name": string,
        "winery": string,
        "image_url": string,
        "likes": integer,
    }
    ```
* Response: A list of wines
* Response shape (JSON):
    ```json
    {
        "wine_name": string,
        "winery": string,
        "image_url": string,
        "likes": integer,
    }
    ```

### Edits wine listing

* Endpoint path: /wines/<int:id>/
* Endpoint method: PUT

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
     ```json
    {
        "wine_name": string,
        "winery": string,
        "image_url": string,
        "likes": integer,
    }
    ```
* Response: A list of wines
* Response shape (JSON):
    ```json
    {
        "wine_name": string,
        "winery": string,
        "image_url": string,
        "likes": integer,
    }
    ```
### Deletes wine listing

* Endpoint path: /wines/<int:id>/
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: Delete confirmation
* Response shape (JSON):
    ```json
    {
        "deleted": boolean
    }
    ```

### Creates a user

* Endpoint path: /accounts
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
    {
        "name": string,
        "email": string,
        "profile_pic": string,
        "username": string,
        "password": string,
        "birthday": string,
        "date_created": date,
        "href": url
    }
    ```
* Response: Confirms successful user creation
* Response shape (JSON):
    ```json
    {
        "name": string,
        "email": string,
        "profile_pic": string,
        "username": string,
        "password": string,
        "birthday": string
    }
    ```

### Edits user information

* Endpoint path: /account/<int:id>/
* Endpoint method: PUT

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
    {
        "name": string,
        "email": string,
        "profile_pic": string,
        "username": string,
        "password": string,
        "birthday": string
    }
    ```
* Response: Confirms successful user edit
* Response shape (JSON):
    ```json
    {
        "name": string,
        "email": string,
        "profile_pic": string,
        "username": string,
        "password": string,
        "birthday": string,
    }
    ```

### Deletes user account

* Endpoint path: /account/<int:id>/
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: Confirms successful user delete
* Response shape (JSON):
    ```json
    {
        "deleted": boolean
    }
    ```

### Get a list of comments

* Endpoint path: /comments
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Response: A list of comments
* Response shape (JSON):
    ```json
    {
        "username": string,
        "content": string,
        "date_posted": string
    }
    ```

### Creates a comment

* Endpoint path: /comments
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
    {
        "username": string,
        "content": string,
        "date_posted": string,
    }
    ```
* Response: Confirms successful user creation
* Response shape (JSON):
    ```json
    {
        "username": string,
        "content": string,
        "date_posted": string,
    }
    ```

### Edits a comment

* Endpoint path: /comments/<int:id>/
* Endpoint method: PUT

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
    {
        "username": string,
        "content": string,
        "date_posted": string,
    }
    ```
* Response: Confirms successful comment edit
* Response shape (JSON):
    ```json
    {
        "username": string,
        "content": string,
        "date_posted": string,
    }
    ```

### Deletes a comment

* Endpoint path: /comments/<int:id>/
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: Confirms successful comment delete
* Response shape (JSON):
    ```json
    {
        "deleted": boolean
    }
    ```

### Log in

* Endpoint path: /token
* Endpoint method: POST

* Request shape (form):
  * username: string
  * password: string

* Response: Account information and a token
* Response shape (JSON):
    ```json
    {
      "account": {
        "username": string,
        "password": string
      },
      "token": string
    }
    ```

## Displays user info

* Endpoint path: /token
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Response: Displays user data
* Response shape (JSON):
    ```json
    {
      "account": {
        "username": string,
        "password": string
      },
      "token": string
    }
    ```

### Log out

* Endpoint path: /token
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: Always true
* Response shape (JSON):
    ```json
    true
    ```
