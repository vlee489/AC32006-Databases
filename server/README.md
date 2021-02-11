# GFFC Server

This folder contains all the code and definitions for the GraphQL API.

## How to configure & run

1. Update DB details
Configure the `src/knexfile.js` file with the credentials of your Database, and state the Database connector you're using

2. Edit Secrets
In the `src/index.js` file update the following constants to what you want to use

- SESSION_SECRECT
- PORT

3. Configure GraphQL
In the `src/index.js` on line 51 you may want to disable the following for **production**

- playground
- tracing
- debug

4. Run Server
Execute the following command to start the server

```bash
node src/index.js
```

*You may want to install and use `nodemon` if you're doing development  to reload the server when a file is updates*


## Authentication

To authenticate with the server you need to do a `POST` request to `http://server/login` with the following JSON data.
```json
{
	"email": "User@email.example",
	"password": "User-Password"
}
```

You'll receive a token is the credentials are correct and you need to place the token as within the header of all requests requiring login in the API @ `http://server/graphql`
```JSON
{
  "Authorization": "{token from Login}"
}
```
