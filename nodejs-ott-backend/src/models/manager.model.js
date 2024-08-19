import mongoose from "mongoose";

const Schema = mongoose.Schema;

const managerSchema = Schema(
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

const Manager = mongoose.model("Manager", managerSchema);

export default Manager;