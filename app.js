const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const nunjucks = require('nunjucks');

// process.env.ENV_VAR
dotenv.config();

const app = express();

// Templating
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('static'));
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

const routes = require('./routes/base.js');
app.use('/', routes);

const EXPRESS_PORT = process.env.EXPRESS_PORT;
const EXPRESS_HOST = process.env.EXPRESS_HOST;
app.listen(EXPRESS_PORT, EXPRESS_HOST, () => {
    console.log(`Express app listening at ${EXPRESS_HOST}:${EXPRESS_PORT}`);
})