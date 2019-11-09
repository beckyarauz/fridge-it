module.exports = require('swagger-jsdoc')({
  swaggerDefinition: {
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
      },
      {
        name: 'admin',
        description: 'fridgeIT management'
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
  },
  apis: ['./**/routes/*.js', 'routes.js'],
});
