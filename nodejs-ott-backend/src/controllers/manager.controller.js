import expressAsyncHandler from "express-async-handler";

import {
    roleNames,
    roleRequestStatus,
    actionsOnRoleRequests
} from "../config/roles-and-permissions.config.js";

import User from "../models/user.model.js";
import Client from "../models/client.model.js";
import Manager from "../models/manager.model.js";
import RoleChangeRequest from "../models/role-change-request.model.js";

const { client, manager, admin } = roleNames;
const { pending, approved, rejected } = roleRequestStatus;
const { approve, reject } = actionsOnRoleRequests;

// @desc   View role
// @route  GET /api/v1/managers/pending-requests
// access  Private [Manager] 
export const viewAllPendingRequests = expressAsyncHandler(async (req, res) => {
    const accessorRole = req.user.role;

    let pendingRequests;

    switch (accessorRole) {
        case manager:
            pendingRequests = await RoleChangeRequest.find({
                requestedRole: manager,
                status: pending,
            });
            break;

        default:
            const err = new Error("Unauthorized: Only manager can access this");
            err.statusCode = 403;
            throw err;
    }

    return res.status(200).json({
        status: "Success",
        message: "Pending requests successfully retrieved",
        data: pendingRequests,
    });
});

// Helper functions to update Manager
const updateManagerInfo = expressAsyncHandler(async (managerId, userId, action) => {
    const managerInfo = await Manager.findById(managerId);
    if (!managerInfo) {
        throw new Error("Internal server error: manager with _id not found");
    }

    switch (action) {
        case approve:
            managerInfo.approvedUserIds.push(userId);
            break;

        case reject:
            managerInfo.rejectedUserIds.push(userId);
            break;
    }

    await managerInfo.save();
});

// @desc   Handle role change request (approve or reject)
// @route  POST /api/v1/managers/process-request?action=xxxx&requestId=xxxx
// @access Private [Manager]
export const handleRoleChangeRequest = expressAsyncHandler(async (req, res) => {
    const accessorRole = req.user.role;
    if (accessorRole !== manager) {
        const err = new Error("Unauthorized: Only manager can access this");
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

    // Find the request
    const request = await RoleChangeRequest.findById(requestId);

    if (!request) {
        const err = new Error("Pending role change request not found or already processed");
        err.statusCode = 400;
        throw err;
    }

    const user = await User.findById(request._id);

    // Approval/Rejection condition
    // Case: if accessor is manager and requested role is "manager"
    if (request.requestedRole !== manager) {
        const err = new Error("Access forbidden to process this type of role change requests");
        err.statusCode = 403;
        throw err;
    }

    switch (action) {
        case approve:
            // Approve request   
            user.role = request.requestedRole;
            await user.save();

            // Update request status
            request.status = approved;
            request.approvedBy = req.user._id;
            await request.save();

            // Update the manager(accessor) document
            await updateManagerInfo(req.user._id, user._id, action);

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

            // Update the manager(accessor) document
            await updateManagerInfo(req.user._id, user._id, action);

            res.status(200).json({
                status: "Success",
                message: "Role change request rejected successfully",
                data: request,
            });
            break;
    }
});

// @desc   View own full user details
// @route  POST /api/v1/managers/view-my-details
// @access Private [Manager]
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

    // Fetch manager activity from Manager collection
    const managerActivity = await Manager.findById(req.user._id).select("-_id");

    // Handle case where client activity is not found
    if (!managerActivity) {
        return res.status(404).json({
            status: false,
            message: "Manager activity not found",
        });
    }

    // Add manager activity to userDetails
    userDetails.managerActivity = managerActivity;

    // Send the response
    res.status(200).json({
        status: true,
        message: "Full user details received successfully",
        data: userDetails,
    });
});