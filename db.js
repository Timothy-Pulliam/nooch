const mongoose = require('mongoose');
const dotenv = require('dotenv');
// process.env.ENV_VAR
dotenv.config();

const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_USER = encodeURIComponent(process.env.MONGO_USER);
const MONGO_PASSWORD = encodeURIComponent(process.env.MONGO_PASSWORD);
const authMechanism = 'DEFAULT';
const mongoURI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:27017/app?authSource=admin`;


const options = {
    maxPoolSize: 100, // Maintain up to 100 socket connections (default is 100)
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(mongoURI);

        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

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

// mongoose.connect(mongoURI, options).then(() => {
//     console.log('MongoDB is connected')
// }).catch(err => {
//     console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
//     setTimeout(connectWithRetry, 5000)
// })

// function connectWithRetry() {
//     return mongoose.connect(mongoURI, options, function (err) {
//         if (err) {
//             console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
//             setTimeout(connectWithRetry, 5000);
//         }
//     });
// };

module.exports = connectDB;