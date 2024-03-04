const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const cors = require('cors');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const app = express();
const PORT = 4000;

const server = new ApolloServer({ typeDefs, resolvers });

// Enable CORS
app.use(cors());

// Apply middleware after server starts
async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app });
}

startApolloServer();

mongoose.connect('mongodb+srv://webdevnav:ZFjNPkr9KrmHOZ4T@cluster0.efmxphq.mongodb.net/ems');

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql`);
});
