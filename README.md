# Backend API Documentation

## 1. post '/api/v1/login'
Parameters 
============
email         
password

req
{
    "email":"adam@wp.pl",
    "password":"password123123"
}
res success
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVudkNvZGUzQHdwLnBsIiwiaWF0IjoxNjkyODc5NjY2LCJleHAiOjE2OTM0ODQ0NjZ9.JaPpjrtnOGTLnK_C5qlx4qZovM6i9_gD1Vgi5Vdt6AM",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVudkNvZGUzQHdwLnBsIiwiaWF0IjoxNjkyODc5NjY2fQ.QHl9Qj2F1PI3Le_SsZc87PCgToFaORA6MX_aaKBbmI0"
}

## 2.  post '/api/v1/register'

Parameters 
============
email         
password

req
{
    "email":"adam@wp.pl",
    "password":"password123123"
}
res success
{
    "message": "User added success fully"
}
## 3. post '/api/v1/refresh-token'

res success
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVudkNvZGUzQHdwLnBsIiwiaWF0IjoxNjkyODc5OTE1fQ.seN7LjyJtoibdWBxceg0G8aWhUNfDwOgFQgA2b0tVKw"
}

## 4. post '/api/v1/logout'

## 5. get '/api/v1/show-messages'

res success{
    "message": [
        {
            "_id": "64e6953ec4adb9df47d3d347",
            "name": "name3",
            "email": "email1p@wp.pl",
            "telephoneNumber": "123123123",
            "message": "message1",
            "__v": 0
        }
    ]
}

## 6. post '/api/v1/create-message'
Parameters 
============
email
telephoneNumber
name
message
req{
    "name": "name3",
    "email": "email1p@wp.pl",
    "telephoneNumber": "123123123",
    "message": "message1"
}

res success{
    "name": "name4",
    "email": "email2p@wp.pl",
    "telephoneNumber": "123123923",
    "message": "message1"
}

## 7. post '/api/v1/delete-message'
Parameter 
============
id

req{
    "id":"64e6953ec4adb9df47d3d347"
}
res success{
    "success": true,
    "message": "message deleted successfully"
}

