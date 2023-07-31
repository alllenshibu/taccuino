const express = require('express');

const { signupController, loginController } = require('./controllers/authenticationController');

const User = require('./models/User');

const router = express.Router();


// Auth routes
router.post("/auth/signup", async (req, res) => {
    signupController(req, res);
});

router.post("/auth/login", async (req, res) => {
    loginController(req, res);
});

module.exports = router;
