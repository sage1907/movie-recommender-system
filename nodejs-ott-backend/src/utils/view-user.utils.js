import expressAsyncHandler from "express-async-handler";

import Client from "../models/client.model.js";
import Manager from "../models/manager.model.js";
import Admin from "../models/admin.model.js";

// @desc   View role
// @route  GET /api/v1/managers/view-clients
// access  Private [Manager, Admin]
export const viewAllClients = expressAsyncHandler(async (req, res) => {
    // Get client documents from the Client collection
    // Here client details like payment status will be shown to Manager or Admin
    const clientDocuments = await Client.find();

    res.status(200).json({
        status: "Success",
        message: "Clients details retrieved successfully",
        data: clientDocuments,
    });
});

// @desc   View role
// @route  GET /api/v1/managers/view-clients/:clientId
// access  Private [Manager, Admin]
export const viewClient = expressAsyncHandler(async (req, res) => {
    const { clientId } = req.params;

    // Get client documents from the Client collection
    // Here client details like payment status will be shown to Manager or Admin
    const clientDocument = await Client.findById(clientId);
    if (!clientDocument) {
        const err = new Error(`No client with _id ${clientId}`);
        err.statusCode = 404;
        throw err;
    }

    res.status(200).json({
        status: "Success",
        message: "Client details retrieved successfully",
        data: clientDocument,
    });
});

// @desc   View role
// @route  GET /api/v1/managers/view-managers
// access  Private [Manager, Admin]
export const viewAllManagers = expressAsyncHandler(async (req, res) => {
    // Get manager documents from the Manager collection
    const managerDocuments = await Manager.find();

    res.status(200).json({
        status: "Success",
        message: "Managers details retrieved successfully",
        data: managerDocuments,
    });
});

// @desc   View role
// @route  GET /api/v1/managers/view-managers/:managerId
// access  Private [Manager, Admin]
export const viewManager = expressAsyncHandler(async (req, res) => {
    const { managerId } = req.params;

    // Get manager documents from the Manager collection
    const managerDocument = await Manager.findById(managerId);
    if (!managerDocument) {
        const err = new Error(`No manager with _id ${managerId}`);
        err.statusCode = 404;
        throw err;
    }

    res.status(200).json({
        status: "Success",
        message: "Manager details retrieved successfully",
        data: managerDocument,
    });
});

// @desc   View role
// @route  GET /api/v1/admins/view-admins
// access  Private [Manager, Admin]
export const viewAllAdmins = expressAsyncHandler(async (req, res) => {
    // Get admin documents from the Admin collection
    const adminDocuments = await Admin.find();

    res.status(200).json({
        status: "Success",
        message: "Admins details retrieved successfully",
        data: adminDocuments,
    });
});

// @desc   View role
// @route  GET /api/v1/admins/view-admins/:admin
// access  Private [Manager, Admin]
export const viewAdmin = expressAsyncHandler(async (req, res) => {
    const { adminId } = req.params;

    // Get admin documents from the Admin collection
    const adminDocument = await Admin.findById(adminId);
    if (!adminDocument) {
        const err = new Error(`No admin with _id ${adminId}`);
        err.statusCode = 404;
        throw err;
    }

    res.status(200).json({
        status: "Success",
        message: "Admin details retrieved successfully",
        data: adminDocument,
    });
});