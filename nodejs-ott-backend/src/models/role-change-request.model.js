import mongoose from "mongoose";

import {
    roleNames,
    roleRequestStatus
} from "../config/roles-and-permissions.config.js";

const Schema = mongoose.Schema;

const roleChangeRequestSchema = Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        // currentRole: {
        //     type: String,
        //     enum: [roleNames.manager, roleNames.client],
        //     required: true,
        // },
        requestedRole: {
            type: String,
            enum: [roleNames.admin, roleNames.manager],
            required: true,
        },
        status: {
            type: String,
            enum: [roleRequestStatus.pending, roleRequestStatus.approved, roleRequestStatus.rejected],
            default: roleRequestStatus.pending,
        },
        approvedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
    },
    {
        timestamps: true,
        _id: false,
    }
);

const RoleChangeRequest = mongoose.model("RoleChangeRequest", roleChangeRequestSchema);

export default RoleChangeRequest;