from jwtdown_fastapi.authentication import Token
from pydantic import BaseModel
from datetime import date
from typing import Optional

default_img = 'https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png'
defaults = {
    'name': 'Joe Smith',
    'username': 'joesmith',
    'password': 'supersecretpassword',
    'birthday': date(1999,12,25),
    'image_url': default_img
    }

class Error(BaseModel):
    message: str

class UserIn(BaseModel):
    name: str = defaults['name']
    username: str = defaults['username']
    password: str = defaults['password']
    birthday: Optional[date] = defaults['birthday']
    image_url: Optional[str] = defaults['image_url']

class UserOut(BaseModel):
    id: int
    name: str = defaults['name']
    username: str = defaults['username']
    birthday: Optional[date] = defaults['birthday']
    image_url: Optional[str] = defaults['image_url']

class UserOutWithPassword(BaseModel):
    id: int
    name: str
    username: str
    birthday: Optional[date]
    image_url: Optional[str]
    hashed_password: str

class UserForm(BaseModel):
    username: str
    password: str

class UserToken(Token):
    user: UserOutWithPassword

class HttpError(BaseModel):
    detail: str

class DuplicateUserError(ValueError):
    pass

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserOutWithPassword
