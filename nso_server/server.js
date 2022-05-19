const express = require("express");
const {graphqlHTTP} = require("express-graphql");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt");

const {sequelize} = require("./models");

require("dotenv").config({
  path: "./dev.env",
});

// ENV variables
const {
  PORT,
  JWT_KEY,
  SALT,
} = process.env;

// Scheme
const schema = require("./schema/schema");

// jwt functions
const jwtEncrypt = async (payload) => {
  return await jwt.sign(payload, JWT_KEY);
};

const jwtDecrypt = (token) => {
  return jwt.verify(token, JWT_KEY);
};

// bcrypt functions
const hashPassword = (pwd) => {
  return bcrypt.hashSync(pwd, SALT);
};
const comparePassword = (pwd, correctPwd) => {
  return bcrypt.compareSync(pwd, correctPwd);
};

(async function() {
  const server = express();
  // console.log(hashPassword("sample")); // default password
  // sequelize
  try {
    await sequelize.authenticate({alter: true});
    console.log("Database connection has been established successfully.");
  } catch (e) {
    throw new Error("Database connection failed." + e);
  }

  server.use(cors());

  await server.use("/", graphqlHTTP({
    schema,
    graphiql: true,
    customFormatErrorFn: (err) => {
      return err;
    },
    context: {
      jwtEncrypt,
      jwtDecrypt,
      hashPassword,
      comparePassword,
    },
  }));

  await server.listen(PORT, () => {
    console.log("Server listening at port:" + PORT);
  });
})();
