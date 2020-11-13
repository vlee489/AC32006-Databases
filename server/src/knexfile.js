// Stored Database details
// TODO: Move to .env file for production
module.exports = {
    development: {
      client: 'mysql2',
      useNullAsDefault: true,
      connection: {
        host : '127.0.0.1',
        user : 'main',
        password : 'password',
        database : 'mydb'
      }
    },
  
    production: {
      client: 'mysql2',
      connection: {
        host : '127.0.0.1',
        user : 'main',
        password : 'password',
        database : 'mydb'
      }
    }
  };