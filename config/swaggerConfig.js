const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation for Todos SharkStart',
            version: '1.0.0',
            descripcion: 'Endpoints iniciales para iniciar con front'
        },
    },
    apis: ['routes/**.js','controller/**.js', 'models/**.js',]
};

const swaggerSpec = swaggerJsdoc(options)

module.exports = swaggerSpec;