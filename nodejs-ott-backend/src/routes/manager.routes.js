import express from "express";

import { roleNames } from "../config/roles-and-permissions.config.js";

import {
    authorize,
    checkPermissions,
    protect,
} from "../middlewares/auth.middleware.js";

import {
    viewAllPendingRequests,
    handleRoleChangeRequest,
    viewFullUserDetails,
} from "../controllers/manager.controller.js";

import {
    viewClient,
    viewAllClients,
    viewManager,
    viewAllManagers,
} from "../utils/view-user.utils.js";

const { client, manager, admin } = roleNames;

const managerRoutes = express.Router();

// All routes are protected
managerRoutes.get("/pending-requests", protect, authorize(manager), checkPermissions("view_pending_manager_role_requests"), viewAllPendingRequests);
managerRoutes.post("/process-request", protect, authorize(manager), checkPermissions("process_manager_role_request"), handleRoleChangeRequest);

managerRoutes.get("/view-clients", protect, authorize(manager), checkPermissions("view_client"), viewAllClients);
managerRoutes.get("/view-clients/:clientId", protect, authorize(manager), checkPermissions("view_client"), viewClient);

managerRoutes.get("/view-managers", protect, authorize(manager), checkPermissions("view_manager"), viewAllManagers);
managerRoutes.get("/view-managers/:managerId", protect, authorize(manager), checkPermissions("view_manager"), viewManager);

managerRoutes.get("/view-my-details", protect, authorize(manager), checkPermissions("view_own_full_details"), viewFullUserDetails);

export default managerRoutes;