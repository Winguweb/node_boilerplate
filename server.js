const express = require("express");
const app = express();
const mainRouter = require('./src/router')
const connectDb = require("./src/connection");
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

require('dotenv').config()
const PORT = 8080;

// EXAMPLE SCHEMA
const schema = buildSchema(`
  type Query {
    example: String
  }
`);

const root = {
  example: () => 'Hello world'
}
// EXAMPLE SCHEMA



app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.use('/', mainRouter);

app.listen(PORT, function() {
  console.log(`Listening on ${PORT}`);
  connectDb().then(() => {
    console.log("MongoDb connected");
  });
});
