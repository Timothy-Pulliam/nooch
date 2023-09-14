const express = require('express');
const router = express.Router();
const path = require('path');

router.get(['/', '/index'], (req, res) => {
    var person = {
        name: "Tim"
    }
    res.render("index.njk", person);
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, "static", "login.html"));
});

router.get('/logout', (req, res) => {
    res.sendFile(path.join(__dirname, "static", "logout.html"));
});

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, "static", "register.html"));
});

// Match all other urls
router.get('*', function (req, res) {
    res.send('Sorry, this is an invalid URL.');
});

// export router to main app
module.exports = router;