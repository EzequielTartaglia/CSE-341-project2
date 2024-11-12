const swaggerAutogen = require('swagger-autogen')();

const isProduction = process.env.NODE_ENV === 'production';
const host = isProduction ? 'cse-341-project2-obur.onrender.com' : 'localhost:8080';

const doc = {
  info: {
    title: 'Movies API',
    description: 'API documentation for movie routes'
  },
  host: host,
  schemes: 'https'
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
