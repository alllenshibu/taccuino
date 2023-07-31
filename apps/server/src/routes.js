const express = require('express');

const { authorize } = require('./middlewares/authorize');

const { signupController, loginController } = require('./controllers/authenticationController');
const { getNoteByIdController, editNoteByIdController, getAllNotesSkeletonController } = require('./controllers/notesController');


const Note = require('./models/Note');

const router = express.Router();


// Auth routes
router.post("/auth/signup", async (req, res) => {
    signupController(req, res);
});

router.post("/auth/login", async (req, res) => {
    loginController(req, res);
});

// Notes routes
router.get("/notes/:id", authorize, (req, res) => {
    getNoteByIdController(req, res);
});

router.get("/notesskeleton", authorize, async (req, res) => {
    getAllNotesSkeletonController(req, res);
});

router.put("/notes/:id", authorize, async (req, res) => {
    editNoteByIdController(req, res);
})

module.exports = router;
