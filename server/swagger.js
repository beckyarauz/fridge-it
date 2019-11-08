const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  info: {
    title: 'FridgeIT Swagger API',
    version: '0.0.1',
    description: 'FridgeIT Swagger API',
  },
  host: 'localhost:3000',
  basePath: '/',
  tags: [
    {
      name: 'user',
      description: 'user management'
    },
    {
      name: 'drinks',
      description: 'all about drinks'
    },
    {
      name: 'fridge',
      description: 'heart of fridgeIT'
    }
  ],
  securityDefinitions: {
    fridgeIT: {
      type: "apiKey",
      in: "cookie",
      name: "connect.sid",
      authorizationUrl: "localhost:3000/api/auth/login"
    }
  }
};

/*

securityDefinitions:
  fridgeId_auth:
    type: "oauth2"
    authorizationUrl: "http://petstore.swagger.io/oauth/dialog"
    flow: "implicit"
    scopes:
      write:pets: "modify pets in your account"
      read:pets: "read your pets"
  api_key:
    type: "apiKey"
    name: "api_key"
    in: "header"

*/

const options = {
  swaggerDefinition: swaggerDefinition,
  apis: ['./**/routes/*.js', 'routes.js'],// pass all in array
};

module.exports = swaggerJSDoc(options);
