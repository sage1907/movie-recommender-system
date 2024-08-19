import { config } from 'dotenv';
import expressAsyncHandler from 'express-async-handler';
import mongoose from 'mongoose';

config();

const dropAllCollections = expressAsyncHandler(async () => {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to the database");

    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.drop();
        console.log(`Dropped collection: ${collection.collectionName}`);
    }
    mongoose.connection.close();
    console.log("All collections dropped successfully. Connection closed");
});

dropAllCollections();
