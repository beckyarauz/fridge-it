const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  info: {
    title: 'FridgeIT Swagger API',
    version: '0.0.1',
    description: 'FridgeIT Swagger API',
  },
  host: 'localhost:3000',
  basePath: '/',
};

const options = {
  swaggerDefinition: swaggerDefinition,
  apis: ['./**/routes/*.js','routes.js'],// pass all in array
};

module.exports = swaggerJSDoc(options);
