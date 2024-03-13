const express = require("express");
const cors = require("cors");
const db = require("./db/dbConfig.js");

const app = express();
const songsController = (require("./controllers/songController.js"))

app.use(cors());
app.use(express.json());
app.use("/songs", songsController);

// ROUTES
// WELCOME 
app.get("/", (req, res) => {
  res.send("Welcome to Tuner");
});

app.get('/songs', async (req, res) => {
  try {
    const songs = await db.any('SELECT * FROM songs');
    res.json(songs);
  } catch (error) {
    console.error('Error retrieving songs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 404 PAGE
app.get("*", (req, res) => {
  res.json({ error: "Page not found" });
});
// EXPORT
module.exports = app;
