import mongoose from 'mongoose';
import { config } from 'dotenv';

// Importing role names
import { roleNames } from '../config/roles-and-permissions.config.js';

// Importing model
import User from '../models/user.model.js';

const { client, manager, admin } = roleNames;

config();

const setupAdmin = async (name, email, password) => {
    await setupUser(name, email, password, admin);
};

const setupManager = async (name, email, password) => {
    await setupUser(name, email, password, manager);
};

const setupClient = async (name, email, password) => {
    await setupUser(name, email, password, client);
};

const setupUser = async (name, email, password, role) => {
    if (!email || !password) {
        console.error('User email or password is not set in environment variables.');
        return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        console.log(`User with email ${email} already exists.`);
        return;    // No need to return existing user's data
    }

    const user = new User({ name, email, password, role, });

    try {
        const savedUser = await user.save();
        console.log(`User ${email} created successfully.`);
        return;
    } catch (error) {
        console.error(`Error creating User ${email}:`, error);
        return;
    }
};

mongoose.connect(process.env.MONGO_URL)
    .then(async () => {
        await Promise.all([
            // Admin setup
            setupAdmin("Admin1", "admin1@example.com", "admin1@1234"),
            setupAdmin("Admin2", "admin2@example.com", "admin2@1234"),
            setupAdmin("Admin3", "admin3@example.com", "admin3@1234"),
            setupAdmin("Admin4", "admin4@example.com", "admin4@1234"),

            // Manager setup
            setupManager("Manager1", "manager1@example.com", "manager1@1234"),
            setupManager("Manager2", "manager2@example.com", "manager2@1234"),
            setupManager("Manager3", "manager3@example.com", "manager3@1234"),
            setupManager("Manager4", "manager4@example.com", "manager4@1234"),

            // Client setup
            setupClient("Client1", "client1@example.com", "client1@1234"),
            setupClient("Client2", "client2@example.com", "client2@1234"),
            setupClient("Client3", "client3@example.com", "client3@1234"),
            setupClient("Client4", "client4@example.com", "client4@1234")
        ]);

        mongoose.connection.close();
    })
    .catch(error => {
        console.error('Error connecting to database:', error);
    });