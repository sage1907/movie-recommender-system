import expressAsyncHandler from "express-async-handler";

import {
    roleNames,
    roleRequestStatus,
    actionsOnRoleRequests
} from "../config/roles-and-permissions.config.js";

import User from "../models/user.model.js";
import Client from "../models/client.model.js";
import Admin from "../models/admin.model.js";
import RoleChangeRequest from "../models/role-change-request.model.js";

import { migrateManagerToAdmin } from "../utils/user-routes.utils.js";

const { client, manager, admin } = roleNames;
const { pending, approved, rejected } = roleRequestStatus;
const { approve, reject } = actionsOnRoleRequests;

// @desc   View role
// @route  GET /api/v1/admins/pending-requests
// access  Private [Admin] 
export const viewAllPendingRequests = expressAsyncHandler(async (req, res) => {
    const accessorRole = req.user.role;

    let pendingRequests;

    switch (accessorRole) {
        case admin:
            pendingRequests = await RoleChangeRequest.find({
                status: pending,
            });
            break;

        default:
            const err = new Error("Unauthorized: Only admin can access this");
            err.statusCode = 403;
            throw err;
    }

    return res.status(200).json({
        status: "Success",
        message: "Pending requests successfully retrieved",
        data: pendingRequests,
    });
});

// Helper functions to update Admin
const updateAdminInfo = expressAsyncHandler(async (adminId, userId, action, role) => {
    const adminInfo = await Admin.findById(adminId);
    if (!adminInfo) {
        throw new Error("Internal server error: admin with _id not found")
    }

    switch (action) {
        case approve:
            adminInfo.approvedUserIds.push({
                _id: userId,
                approvedRole: role,
            });
            break;

        case reject:
            adminInfo.rejectedUserIds.push({
                _id: userId,
                rejectedRole: role,
            });
            break;
    }

    await adminInfo.save();

});

// @desc   Handle role change request (approve or reject)
// @route  POST /api/v1/admins/process-request?action=xxxx&requestId=xxxx
// @access Private [Admin]
export const handleRoleChangeRequest = expressAsyncHandler(async (req, res) => {
    const accessorRole = req.user.role;
    if (accessorRole !== admin) {
        const err = new Error("Unauthorized: Only admin can access this");
        err.statusCode = 403;
        throw err;
    }

    const { action, requestId } = req.query;

    // Validate action
    if (action !== approve && action !== reject) {
        const err = new Error("Invalid action requested");
        err.statusCode = 400;
        throw new err;
    }

    if (!requestId) {
        const err = new Error("requestId not included as query paramater");
        err.statusCode = 400;
        throw new err;
    }

    // Find the request
    const request = await RoleChangeRequest.findById(requestId);

    if (!request) {
        const err = new Error("Pending role change request not found or already processed");
        err.statusCode = 400;
        throw err;
    }

    const user = await User.findById(request._id);

    const shouldMigrateManagerToAdmin = (request.requestedRole === admin && user.role === manager);

    switch (action) {
        case approve:
            // Approve request   
            user.role = request.requestedRole;
            await user.save();

            // Update request status
            request.status = approved;
            request.approvedBy = req.user._id;
            await request.save();

            // Update the admin(accessor) document
            await updateAdminInfo(req.user._id, user._id, action, user.role);

            if (shouldMigrateManagerToAdmin === true) {
                migrateManagerToAdmin(user._id);
            }

            res.status(200).json({
                status: "Success",
                message: "Role change request approved successfully",
                data: request,
            });
            break;

        case reject:
            // Reject request
            request.status = rejected;
            request.rejectedBy = req.user._id;
            await request.save();

            // Update the admin(accessor) document
            await updateAdminInfo(req.user._id, user._id, action);

            res.status(200).json({
                status: "Success",
                message: "Role change request rejected successfully",
                data: request,
            });
            break;
    }
});

// @desc   View own full user details
// @route  POST /api/v1/admins/view-my-details
// @access Private [Admin]
export const viewFullUserDetails = expressAsyncHandler(async (req, res) => {
    // Initialize userDetails object
    let userDetails = {};

    // Populate userDetails with user PII
    userDetails.userPII = req.user;

    // Fetch client activity from Client collection
    const clientActivity = await Client.findById(req.user._id).select("-_id");

    // Handle case where client activity is not found
    if (!clientActivity) {
        return res.status(404).json({
            status: false,
            message: "Client activity not found",
        });
    }

    // Add client activity to userDetails
    userDetails.clientActivity = clientActivity;

    // Fetch admin activity from Admin collection
    const adminActivity = await Admin.findById(req.user._id).select("-_id");

    // Handle case where admin activity is not found
    if (!adminActivity) {
        return res.status(404).json({
            status: false,
            message: "Manager activity not found",
        });
    }

    // Add admin activity to userDetails
    userDetails.adminActivity = adminActivity;

    // Send the response
    res.status(200).json({
        status: true,
        message: "Full user details received successfully",
        data: userDetails,
    });
});