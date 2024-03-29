const express = require("express");
const colors = require("colors");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const db = require("./config/db");
const cors = require("cors");

const port = process.env.PORT | 5000;
const app = express();
db();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "D",
  })
);

app.listen(port, console.log(`Server runs on ${port}`));
