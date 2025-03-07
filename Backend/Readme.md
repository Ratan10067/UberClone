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