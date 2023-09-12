import swaggerautogen from 'swagger-autogen'

const swaggerAutogen = swaggerautogen()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/visitor.js']

swaggerAutogen(outputFile, endpointsFiles)
