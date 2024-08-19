import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import { roleNames } from "../config/roles-and-permissions.config.js";

import {
    registerAdmin,
    registerClient,
    registerManager
} from "../utils/user-routes.utils.js";

const { client, manager, admin } = roleNames;

const Schema = mongoose.Schema;

const userSchema = Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            enum: [admin, manager, client],
            default: client,
        }
    },
    {
        timestamps: true,
    }
);

// Pre-save hook to hash the password before saving the user
userSchema.pre('save', async function (next) {
    // If PII is modified or new user
    if (this.isModified('password') || this.isNew) {

        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        } catch (error) {
            return next(error);
        }
    }
});

// Post-save hook to call registerClient function
userSchema.post('save', async function (doc, next) {
    try {
        await registerClient(doc._id);

        let registerFunction;
        switch (doc.role) {
            case manager:
                registerFunction = registerManager;
                break;
            case admin:
                registerFunction = registerAdmin;
                break;
        }

        if (registerFunction) {
            await registerFunction(doc._id);
        }

        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model("User", userSchema);

export default User;