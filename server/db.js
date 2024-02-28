import { MongoClient } from 'mongodb';

let dbConnection;

export const connectToDb = (cb) => {
    MongoClient.connect('mongodb://127.0.0.1:27017/bookclub')
        .then((client) => {
            dbConnection = client.db();
            console.log('Connected to MongoDB');
            cb(); // Call the callback function
        })
        .catch((err) => {
            console.log('Error connecting to MongoDB:', err);
            cb(err); // Call the callback function with error
        });
};

export const getDb = () => dbConnection;