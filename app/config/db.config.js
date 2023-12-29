const mongoose = require('mongoose');
const { error, info } = require('./logger');

const NAMESPACE = 'Database';

const connectDB = () => {
    const url = process.env.DATABASE_URL;
    mongoose.connect(url);
    const db = mongoose.connection;

    db.on('error', (err) => error(NAMESPACE, 'Connection Problem', err));
    db.once('open', () => info(NAMESPACE, 'Connected to Mongodb'));
};


module.exports = {
    connectDB
}
