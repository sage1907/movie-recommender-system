import mongoose from "mongoose";

import { roleNames } from "../config/roles-and-permissions.config.js";
const { client, manager, admin } = roleNames;

const Schema = mongoose.Schema;

const adminSchema = Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        approvedUserIds: [
            {
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                approvedRole: {
                    type: String,
                    enum: [client, manager, admin],
                    required: true,
                },
                approvedAt: {
                    type: Date,
                    default: Date.now,
                },
            }
        ],
        rejectedUserIds: [
            {
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                rejectedRole: {
                    type: String,
                    enum: [client, manager, admin],
                    required: true,
                },
                rejectedAt: {
                    type: Date,
                    default: Date.now,
                },
            }
        ],
        addedContentIds: [
            {
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Content",
                    required: true,
                },
                addedAt: {
                    type: Date,
                    default: Date.now,
                },
            }
        ],
        editedContentIds: [
            {
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Content",
                    required: true,
                },
                editedAt: {
                    type: Date,
                    default: Date.now,
                },
            }
        ],
        removedContentIds: [
            {
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Content",
                    required: true,
                },
                removedAt: {
                    type: Date,
                    default: Date.now,
                },
            }
        ],
    },
    {
        timestamps: true,
        _id: false,
    }
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;