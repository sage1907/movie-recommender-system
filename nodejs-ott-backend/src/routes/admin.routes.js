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
} from "../controllers/admin.controller.js";

import {
    viewClient,
    viewAllClients,
    viewManager,
    viewAllManagers,
    viewAdmin,
    viewAllAdmins,
} from "../utils/view-user.utils.js";

const { client, manager, admin } = roleNames;

const adminRoutes = express.Router();

// All routes are protected
adminRoutes.get("/pending-requests", protect, authorize(admin), checkPermissions("view_pending_manager_role_requests", "view_pending_admin_role_requests"), viewAllPendingRequests);
adminRoutes.post("/process-request", protect, authorize(admin), checkPermissions("process_manager_role_request", "process_admin_role_request"), handleRoleChangeRequest);

adminRoutes.get("/view-clients", protect, authorize(admin), checkPermissions("view_client"), viewAllClients);
adminRoutes.get("/view-clients/:clientId", protect, authorize(admin), checkPermissions("view_client"), viewClient);

adminRoutes.get("/view-managers", protect, authorize(admin), checkPermissions("view_manager"), viewAllManagers);
adminRoutes.get("/view-managers/:managerId", protect, authorize(admin), checkPermissions("view_manager"), viewManager);

adminRoutes.get("/view-admins", protect, authorize(admin), checkPermissions("view_admin"), viewAllAdmins);
adminRoutes.get("/view-admins/:adminId", protect, authorize(admin), checkPermissions("view_admin"), viewAdmin);

adminRoutes.get("/view-my-details", protect, authorize(admin), checkPermissions("view_own_full_details"), viewFullUserDetails);

export default adminRoutes;