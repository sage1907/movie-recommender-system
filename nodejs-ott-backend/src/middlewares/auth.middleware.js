import expressAsyncHandler from "express-async-handler";

import User from "../models/user.model.js";

import { getRolePermissions } from "../config/roles-and-permissions.config.js";

import {
    getTokenFromHeader,
    verifyToken
} from "../utils/token.utils.js";

// Protect Middleware
export const protect = expressAsyncHandler(async (req, res, next) => {
    const token = getTokenFromHeader(req);

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
        const decodedToken = verifyToken(token);
        if (!decodedToken) {
            return res.status(401).json({ message: "Not authorized, token failed" });
        }

        // Attach the user to the request object
        req.decodedToken = decodedToken;
        req.user = await User.findById(decodedToken.id).select("-password");

        if (!req.user) {
            res.status(404);
            throw new Error("User not found");
        }

        // Check if the user's updatedAt field is after the token's iat
        if (req.user.updatedAt > new Date(req.decodedToken.iat * 1000)) {
            return res.status(401).json({ message: "Not authorized, token invalidated by profile update" });
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: "Not authorized, token failed" });
    }
});

// Authorize Middleware
export const authorize = (...permittedRoles) => {
    return (req, res, next) => {
        if (req.user && permittedRoles.includes(req.user.role)) {
            next();
        } else {
            // console.log(req.user.role, permittedRoles);
            return res.status(403).json({ message: "User not authorized for this action" });
        }
    };
};

// Check Permissions Middleware
export const checkPermissions = (...requiredPermissions) => {
    return expressAsyncHandler(async (req, res, next) => {
        const userPermissions = getRolePermissions(req.user.role);

        const hasAllPermissions = requiredPermissions.every(permission =>
            userPermissions.includes(permission)
        );

        if (hasAllPermissions) {
            next();
        } else {
            return res.status(403).json({ message: "Permission denied" });
        }
    });
};

//  Self-note:
//  The protect middleware is a standard middleware function. It performs a single, specific task: verifying the presence and validity of a token and attaching the decoded token information to the request object.
//  The checkPermissions middleware is a middleware factory. It generates middleware functions dynamically based on the provided permission parameter, which allows for flexible and reusable permission checks across different routes.