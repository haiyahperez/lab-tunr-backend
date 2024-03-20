const express = require("express");
const songs = express.Router();


const { 
  getAllSongs, 
  getSong, 
  createSong, 
  updateSong, 
  deleteSong } = require("../queries/songs");

const { checkBoolean, checkName} = require("../validations/checkSongs");

// GET ALL
songs.get("/songs", async (_req, res) => {
    const allSongs = await getAllSongs();

    if (allSongs[0]) res.status(200).json(allSongs);
    else res.status(500).json({ error });
});


// SHOW
songs.get('/:id', async (req, res) => {
  const { id } = req.params
  const song = await getSong(id)
  if (song) {
    res.json(song)
  } else {
    res.status(404).json({ error: 'not found' })
  }
})

// CREATE
songs.post("/",checkBoolean, checkName, async (req, res) => {
  try {
    const song = await createSong(req.body)
    res.json(song)
  } catch (error) {
    res.status(400).json({ error })
  }
})

// UPDATE
songs.put("/:id", async (req, res) => {
  const { id } = req.params;
  if (id) {
    const updatedSong = await updateSong(id, req.body);
    res.status(200).json(updatedSong);
  } else {
    res.status(400).json({ error });
  }
});

songs.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedSong = await deleteSong(id);
  if (deletedSong.id) {
    res.status(200).json(deletedSong);
  } else {
    res.status(404).json("Song not found");
  }
});

module.exports = songs;

