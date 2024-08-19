import mongoose from "mongoose";

const Schema = mongoose.Schema;

const clientSchema = Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        watchList: [
            {
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Content",
                },
                addedAt: {
                    type: Date,
                    default: Date.now,
                }
            }
        ],
        favouritesList: [
            {
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Content",
                },
                addedAt: {
                    type: Date,
                    default: Date.now,
                }
            }
        ],
    },
    {
        timestamps: true,
        _id: false,
    }
)

const Client = mongoose.model("Client", clientSchema);

export default Client;