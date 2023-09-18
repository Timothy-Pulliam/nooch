const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const nunjucks = require('nunjucks');
const redis = require('redis');
const connectDB = require('./db.js');


// process.env.ENV_VAR
dotenv.config();

const app = express();

connectDB();

// if (process.env.NODE_ENV === 'development') {
//     app.use(morgan('dev'));
// }

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

// Templating
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('static'));
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// Session / Redis
// const session = require('express-session');
const redisClient = redis.createClient({
    url: `redis://${process.env.REDIS_HOST}`
});
// redisClient.connect();
// redisClient.on('error', err => console.log('Redis Client Error', err));
// redisClient.on("connect", () => {
//     console.log("connected to redis successfully");
// });

const routes = require('./routes/base.js');
app.use('/', routes);

const EXPRESS_PORT = process.env.EXPRESS_PORT;
const EXPRESS_HOST = process.env.EXPRESS_HOST;
app.listen(EXPRESS_PORT, EXPRESS_HOST, () => {
    console.log(`Express app listening at ${EXPRESS_HOST}:${EXPRESS_PORT}`);
});


// mongo
// const mongoURI = 'mongodb://root:example@127.0.0.1:27017/app?authSource=admin';
// const options = {
//     maxPoolSize: 100, // Maintain up to 100 socket connections (default is 100)
//     serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
//     socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
//     family: 4 // Use IPv4, skip trying IPv6
// };

// mongoose.connect('mongodb://root:example@127.0.0.1:27017/app?authSource=admin');

// try initial connection
// mongoose.connect(mongoURI, options)
//     .catch(err => console.error(err));

// // catch errors after connection is established
// mongoose.connection.on('error', err => {
//     console.log(err);
// });

// // catch mongoose disconnected
// mongoose.connection.on('disconnected', err => {
//     console.log(err);
// });


// redisClient.on('error', (err) => {
//     console.log('Redis error:', err);
// });