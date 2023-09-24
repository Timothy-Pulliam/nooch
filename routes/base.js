const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
var bcrypt = require('bcrypt');
const saltRounds = 10;
const axios = require('axios');

axios.defaults.headers.common['x-app-id'] = process.env.APP_ID;
axios.defaults.headers.common['x-app-key'] = process.env.APP_KEY;

router.get(['/', '/index'], (req, res) => {
    var person = {
                 name: "Tim"
                 }
    
    res.render("index.njk", person);
});

router.get('/login', (req, res) => {
    res.render("login.njk")
});

router.post('/login', async (req, res) => {
    try {
        // Find user by email
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // User is authenticated
        res.json({ message: 'User authenticated' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/logout', (req, res) => {
    res.sendFile(path.join(__dirname, "static", "logout.html"));
});

router.get('/register', (req, res) => {
    res.render("register.njk");
});

router.post('/register', (req, res) => {

    var email = req.body.email;
    var password = req.body.password;
    var username = req.body.username;

    User.findOne({ email: email }).then(user => {
        if (user) {
            // throw 400 error if email already exists
            return res.status(400).json({ email: "A user has already registered with this email." });
        } else {
            // otherwise create a new user
            bcrypt.hash(password, saltRounds, function (err, hash) {
                const newUser = new User({
                    username: username,
                    email: email,
                    password: hash
                });
                newUser.save();
                return res.status(200).json({ user: newUser });
            });

        };
    });
});

router.get('/search', function (req, res) {
    axios.get('https://trackapi.nutritionix.com/v2/search/instant?query=apple')
        .then(function (response) {
            console.log(response.data.common);
        })
        .catch(function (error) {
            console.log(error);
        });
    res.send("OK");
});

router.get('/nutrients', function (req, res) {
    data = {
        "query": "apple",
        "timezone": "US/Eastern"
    }
    axios.post('https://trackapi.nutritionix.com/v2/natural/nutrients', data)
        .then(function (response) {
            console.log(response.data.foods);
        })
        .catch(function (error) {
            console.log(error);
        });
    res.send("OK");
});

// Match all other urls
router.get('*', function (req, res) {
    res.send('Sorry, this is an invalid URL.');
});

// export router to main app
module.exports = router;