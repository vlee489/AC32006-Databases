/*
Runs all the code for the API
*/
const express = require('express')
const bodyParser = require('body-parser')

const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const schema = require('./schema');

const { Staff } = require('./models/staff')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Config
// TODO: Grab details for .env
const PORT = 4000;
const SESSION_SECRECT = 'wOdLXkh*WNINd#k2qA8j%tF%mED8c1ho';

// Express App
const app = express();
app.use(bodyParser.json())

const context = ({ req }) => {
  /*
  Creates the context checks for if a user if logged in or not
  Verification is done using JWT in the header of the request.
  Can not use async!
  */
  const token = req.headers.authorization || ''
  const splitToken = token.split(' ')[1]
  try {
    var decoded = jwt.verify(token, SESSION_SECRECT);
    if(decoded){
      return{
        auth: true,
        user: decoded
      }
    }
  } catch(err) {
    return{
      auth: false,
    }
  }
}

// The Apollo Server constructor, takes in Schema from Schema Builder and other prams
const server = new ApolloServer({
  introspection: true,
  playground: true,
  schema: schema,
  tracing: true, // Disable in Production
  debug: true, // Disable in Production
  context: context
});

server.applyMiddleware({ app });

// Login page
app.post('/login', async (req, res) => {
  // Check if body has email and password
  if(('email' in req.body) && ('password' in req.body)){
    const { email, password } = req.body
    // Find entry of staff with said email
    const loginEntry = await Staff.query().findOne({ 'Email': email })
    if (loginEntry) {
      // Check bcrypt password
      const match = await bcrypt.compare(password, loginEntry.Password)
      if (match) {
        // Create token and send back
        const token = jwt.sign({
          ID: loginEntry.StaffID,
          Position: loginEntry.Position,
          Email: loginEntry.Email
        }, SESSION_SECRECT, { expiresIn: '1h' });
        // Get the time token will expire for user
        var expire = new Date();
        expire.setHours(expire.getHours() + 1);
        // Send token
        res.send({
          success: true,
          token: token,
          expire: expire
        })
      } else {
        res.status(401).send({
          success: false,
          message: 'Incorrect credentials',
        })
      }
    } else {
      res.status(401).send({
        success: false,
        message: `Incorrect credentials`,
      })
    }
  }else{
    res.status(404).send({
      success: false,
      message: 'No / Incomplete Credentials Provided',
    })
  }
})


// Start Server
app.listen({ port: PORT }, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
});