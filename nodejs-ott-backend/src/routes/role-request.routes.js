import express from "express";

import { roleNames } from "../config/roles-and-permissions.config.js";

import {
    getUserRoleAndPermissions,
    requestRoleChange,
    viewPendingRoleChangeRequest
} from "../controllers/role-request.controller.js";

import {
    authorize,
    checkPermissions,
    protect
} from "../middlewares/auth.middleware.js";

const { client, manager, admin } = roleNames;

const roleRequestRoutes = express.Router();

// All routes are protected
// Routes accessible to client, manager, admin
roleRequestRoutes.get("/", protect, authorize(client, manager, admin), checkPermissions("view_own_permissions"), getUserRoleAndPermissions);

// Routes accessible to client, manager
roleRequestRoutes.post("/request", protect, authorize(client, manager), checkPermissions("request_role_upgrade"), requestRoleChange);
roleRequestRoutes.get("/view-pending-request", protect, authorize(client, manager), checkPermissions("check_if_role_request_pending"), viewPendingRoleChangeRequest);

export default roleRequestRoutes;