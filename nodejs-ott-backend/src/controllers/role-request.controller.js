import expressAsyncHandler from "express-async-handler";

import {
    roleNames,
    roleRequestStatus,
    getRolePermissions,
} from "../config/roles-and-permissions.config.js";

import RoleChangeRequest from "../models/role-change-request.model.js";

const { client, manager, admin } = roleNames;
const { pending, approved, rejected } = roleRequestStatus;

// @desc   View role
// @route  GET /api/v1/roles/
// @access Private
export const getUserRoleAndPermissions = expressAsyncHandler(async (req, res) => {
    res.status(200).json({
        status: "Success",
        message: `${req.user.name}'s permissions retrieved successfully`,
        data: {
            role: req.user.role,
            permissions: getRolePermissions(req.user.role),
        },
    });
});

// @desc   Request role change
// @route  POST /api/v1/roles/request
// @access Private
export const requestRoleChange = expressAsyncHandler(async (req, res) => {
    const { requestedRole } = req.body;
    const currentRole = req.user.role;

    const pendingRequest = await RoleChangeRequest.findById(req.user._id);

    if (pendingRequest) {
        const err = new Error("User already has a pending role change request");
        err.statusCode = 409
        throw err;
    }

    // Permissible requests
    // Case A: Client --> Manager / Admin
    const caseA = currentRole === client && [manager, admin].includes(requestedRole);
    // Case B: Manager -> Admin
    const caseB = currentRole === manager && requestedRole === admin;

    if (!caseA && !caseB) {
        const err = new Error("Invalid role request");
        err.statusCode = 400;
        throw err;
    }

    // Create role change request
    const request = new RoleChangeRequest({
        _id: req?.user?._id,
        // currentRole: currentRole,
        requestedRole: requestedRole,
    });

    await request.save();

    res.status(201).json({
        status: "Success",
        message: "Role change request submitted successfully",
        data: request,
    });
});

// @desc   View pending role change request
// @route  GET /api/v1/roles/view-pending-request
// @access Private [Client, Manager]
export const viewPendingRoleChangeRequest = expressAsyncHandler(async (req, res) => {
    const pendingRequest = await RoleChangeRequest.findById(req.user._id);
    return res.status(200).json({
        status: "Success",
        message: "Pending role request retrieved successfully",
        data: pendingRequest,
    });
});