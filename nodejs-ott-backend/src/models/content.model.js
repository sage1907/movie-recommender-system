import mongoose from "mongoose";

import { genresArray } from "../config/content-genre.config.js";

import { roleNames } from "../config/roles-and-permissions.config.js";

import Admin from "./admin.model.js";
import Manager from "./manager.model.js";

const { client, manager, admin } = roleNames;

const Schema = mongoose.Schema;

const contentSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        genre: {
            type: [{
                type: String,
                enum: genresArray,
            }],
            required: true,
            validate: {
                validator: (arr) => {
                    return arr.length > 0;
                },
                message: "At least one genre-type required",
            },
        },
        releaseYear: {
            type: String,
            required: true,
        },
        directorName: {
            type: String,
            required: true,
        },
        castName: {
            type: [String],
            required: true,
            validate: {
                validator: (arr) => {
                    return arr.length >= 3;
                },
                message: "At least 3 cast names required",
            },
        },
        duration: {
            type: Schema.Types.String, // Mixed type to store either number or string
            required: true,
            min: 0,
        },
        rating: {
            type: Schema.Types.Number,
            required: true,
            min: 0,
            max: 10,
        },
        thumbnailUrl: {
            type: String,
            required: true,
            default: "https://example.com/placeholder-thumbnail.jpg",
        },
        posterUrl: {
            type: String,
            required: true,
            default: "https://example.com/placeholder-poster.jpg",
        },
        videoUrl: {
            type: String,
            required: true,
            default: "https://example.com/placeholder-video.mp4",
        },
        // To store public_id for cloudinary assets
        thumbnailPublicId: {
            type: String,
        },
        posterPublicId: {
            type: String,
        },
        addedBy: {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                refPath: "addedBy.role",
            },
            role: {
                type: String,
                required: true,
                enum: [client, manager, admin],
            },
            addedAt: {
                type: Date,
                default: Date.now,
            }
        },
        editedBy: {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "editedBy.role",
            },
            role: {
                type: String,
                required: true,
                enum: [client, manager, admin],
            },
            editedAt: {
                type: Date,
                default: Date.now,
            }
        },
    },
    {
        timestamps: true
    }
);

// A unique compound index on title, and directorName
contentSchema.index({ title: 1, directorName: 1 }, { unique: true });

contentSchema.pre('save', async function (next) {
    this._wasNew = this.isNew;
    next();
});

contentSchema.post('save', async function (doc, next) {
    try {
        // If the content was added or edited
        if (this._wasNew) {
            // Content added
            switch (this.addedBy.role) {
                case admin:
                    await Admin.findOneAndUpdate(
                        { _id: this.addedBy._id },
                        {
                            $push: {
                                addedContentIds: {
                                    _id: doc._id,
                                    addedAt: doc.addedBy.addedAt
                                }
                            }
                        },
                        { new: true }
                    );
                    break;

                case manager:
                    await Manager.findOneAndUpdate(
                        { _id: this.addedBy._id },
                        {
                            $push: {
                                addedContentIds: {
                                    _id: doc._id,
                                    addedAt: doc.addedBy.addedAt
                                }
                            }
                        },
                        { new: true }
                    );
                    break;
            }
        } else {
            // Content edited
            switch (this.addedBy.role) {
                case admin:
                    await Admin.findOneAndUpdate(
                        { _id: this.editedBy._id },
                        {
                            $push: {
                                editedContentIds: {
                                    _id: doc._id,
                                    editedAt: doc.editedBy.editedAt
                                }
                            }
                        },
                        { new: true }
                    );
                    break;
                case manager:
                    await Manager.findOneAndUpdate(
                        { _id: this.editedBy._id },
                        {
                            $push: {
                                editedContentIds: {
                                    _id: doc._id,
                                    editedAt: doc.editedBy.editedAt
                                }
                            }
                        },
                        { new: true }
                    );
                    break;
            }
        }
    } catch (error) {
        next(error);
    }
});

const Content = mongoose.model("Content", contentSchema);

export default Content;