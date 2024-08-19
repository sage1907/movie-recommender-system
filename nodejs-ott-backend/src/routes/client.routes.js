import express from "express";

import { roleNames } from "../config/roles-and-permissions.config.js";

import {
    authorize,
    checkPermissions,
    protect
} from "../middlewares/auth.middleware.js";

import {
    addToFavlist,
    addToWatchlist,
    deleteFromFavlist,
    deleteFromWatchlist,
    getFavlistDetails,
    getWatchlistDetails,
    viewFullUserDetails,
} from "../controllers/client.controller.js";

const { client, manager, admin } = roleNames;

const clientRoutes = express.Router();

// All routes are protected
// Clients-only
clientRoutes.get("/view-my-details", protect, authorize(client), checkPermissions("view_own_full_details"), viewFullUserDetails);

// Accessible to all types of user-groups
clientRoutes.get("/watchlist", protect, authorize(client, manager, admin), checkPermissions("view_watchlist"), getWatchlistDetails);
clientRoutes.get("/favlist", protect, authorize(client, manager, admin), checkPermissions("view_favlist"), getFavlistDetails);

clientRoutes.put("/watchlist/:contentId", protect, authorize(client, manager, admin), checkPermissions("add_content_to_watchlist"), addToWatchlist);
clientRoutes.put("/favlist/:contentId", protect, authorize(client, manager, admin), checkPermissions("add_content_to_favlist"), addToFavlist);

clientRoutes.delete("/watchlist/:contentId", protect, authorize(client, manager, admin), checkPermissions("delete_content_from_watchlist"), deleteFromWatchlist);
clientRoutes.delete("/favlist/:contentId", protect, authorize(client, manager, admin), checkPermissions("delete_content_from_favlist"), deleteFromFavlist);

export default clientRoutes;