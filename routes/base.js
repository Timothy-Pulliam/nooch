const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
var bcrypt = require('bcrypt');
const axios = require('axios');
const util = require('util');

// Nutritionx headers
axios.defaults.headers.common['x-app-id'] = process.env.APP_ID;
axios.defaults.headers.common['x-app-key'] = process.env.APP_KEY;
axios.defaults.headers.common['x-remote-user-id'] = process.env.REMOTE_USER_ID;

// The work factor should be as large as verification server performance will allow, with a minimum of 10.
// https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html#bcrypt
const saltRounds = 10;

router.get(['/', '/index'], (req, res) => {
    res.render("index");
});

router.get('/register', (req, res) => {
    res.render("register");
});

router.post('/register', async (req, res) => {
    if (!req.body.email) {
        res.json({ success: false, message: "No email provided" });
    }
    if (!req.body.password) {
        res.json({ success: false, message: "No password provided" });
    }

    var email = req.body.email;
    var password = req.body.password;

    // bcrypt algorithm doesn't work for passwords greater than 72 bytes
    const passwordByteLength = Buffer.from(req.body.password).length;
    if (passwordByteLength > 72) {
        res.json({ success: false, message: "Password is too long" })
    }

    await User.findOne({ email: email }).then(user => {
        if (user) {
            // throw 400 error if email already exists
            return res.status(400).json({ email: "A user has already registered with this email." });
        } else {
            // otherwise create a new user
            bcrypt.hash(password, saltRounds, function (err, hash) {
                const newUser = new User({
                    email: email,
                    password: hash
                });
                newUser.save();
                // return res.status(200).json({ user: newUser });
                res.redirect("/");
            });
        };
    });
});


router.get('/login', (req, res) => {
    res.render("login")
});


router.post('/login', async (req, res) => {
    if (!req.body.email) {
        res.json({ success: false, message: "No email provided" });
    }
    if (!req.body.password) {
        res.json({ success: false, message: "No password provided" });
    }

    // Timing Based Attacks
    // https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html#authentication-responses
    const user = await User.findOne({ email: req.body.email });
    // If no user found
    if (!user) {
        // https://blog.propelauth.com/understanding-timing-attacks-with-code/
        await bcrypt.compare(req.body.password, '$2b$10$jIlWweLwZn78ZdzTzZpoqe5lagvoGQHnVzamrZ7P/XdFjtl9yGiBu');
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (err) {
            console.error(err);
            return res.render('login');
        }
        if (result) {
            console.log("User authenticated successfully");
            return res.redirect('/');
        } else {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
    });
});

// router.get('/logout', (req, res) => {
//     res.sendFile(path.join(__dirname, "static", "logout.html"));
// });




router.get('/search', async (req, res) => {

    if (req.query.query != undefined) {
        await axios.get(`https://trackapi.nutritionix.com/v2/search/instant?query=${req.query.query}`)
            .then(function (response) {
                // Avoid circular references within JSON object
                //obj_str = util.inspect(response);
                console.log(response.data.common); // common/branded items
                // res.json(response.data.common);
                res.render('search', { data: response.data.common })
            })
            .catch(function (error) {
                console.log(error);
            });
    } else {
        res.render('search');
    }
});

// router.get('/search', (req, res) => {
//     res.render('search.njk');
// });

router.get('/nutrients', async (req, res) => {
    data = {
        "query": "apple",
        "timezone": "US/Eastern"
    };
    await axios.post('https://trackapi.nutritionix.com/v2/natural/nutrients', data)
        .then(function (response) {
            console.log(response.data.foods);
            res.send(response.data.foods);
        })
        .catch(function (error) {
            console.log(error);
        });
});

// Match all other urls
router.get('*', function (req, res) {
    res.render('404');
});

// export router to main app
module.exports = router;