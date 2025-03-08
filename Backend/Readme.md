### POST /users/register

#### Description

This endpoint is used to register a new user.

#### Request Body

The request body should be a JSON object containing the following fields:

- `fullname`: An object containing the user's first name and last name.
  - `firstname`: A string representing the user's first name. It must be at least 3 characters long.
  - `lastname`: A string representing the user's last name. It must be at least 3 characters long.
- `email`: A string representing the user's email address. It must be a valid email address.
- `password`: A string representing the user's password. It must be at least 6 characters long.

Example:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### POST /users/login

# Description

This endpoint is used to log in an existing user.

# Request Body

The request body should be a JSON object containing the following fields:

`email:` A string representing the user's email address. It must be a valid email address.
`password:` A string representing the user's password. It must be at least 6 characters long.
{
"email": "john.doe@example.com",
"password": "password123"
}

# Responses

200 OK

Description: User logged in successfully.
Body: A JSON object containing the authentication token and user details.

```json
Example:
{
  "token": "your_jwt_token",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

400 Bad Request

Description: Validation error or missing required fields.
Body: A JSON object containing the validation errors.
Example:

```json
{
  "errors": [
    {
      "msg": "Invalid email address",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password Must be atleast 6 characters",
      "param": "password",
      "location": "body"
    }
  ]
}
```

401 Unauthorized

Description: Invalid email or password.
Body: A JSON object containing the error message.

```json
Example:
{
  "message": "Invalid email or password"
}
```
