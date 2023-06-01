const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
const db = require("./config/connection");
const PORT = process.env.PORT || 3001;
const axios = require("axios");
// const multer = require("multer");
const cron = require("node-cron");
const cors = require("cors");
const {Plant} = require("./models")
// const { storage, fileFilter, getImageString } = require("./utils/multer");
const fs = require("fs");
require("dotenv").config();

const app = express();
app.use(cors());
// const upload = multer({ storage, fileFilter });

// Serve up static assets
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  // uploads: {
  //   maxFileSize: 10000000, // Set the maximum file size (in bytes) here as needed
  // },
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.get("/api/plantReset", async (req, res) => {
  // Check if the current date is the first day of the month
  var today = new Date();
  if (today.getDate() !== 1) {
    console.log("CRON JOB WILL ONLY RUN IN THE FIRST OF THE MONTH");
    res.json({ message: "Cron job will run on the 1st." });
    return;
  }
  try {
    //Reset the waterAdded field to 0 for all plants at midnight of each month
    await Plant.updateMany({}, { $set: { waterAdded: 0 } });
    console.log("Water needed reset completed.");
    res.json({ message: "Water needed reset completed." });
  } catch (error) {
    console.error("Error resetting water needed:", error);
    res.status(500).json({ error: "An error occurred while resetting water needed." });
  }
});

db.once("open", () => {
  try {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
});
