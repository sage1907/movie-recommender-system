export const roles = {
    client: {
        name: "client",
        permissions: [
            // User permissions
            "edit_own_PII_details",                 // change own user details                                      [Done: check userRoutes]
            "view_own_PII_details",                 // view own user details                                        [Done: check userRoutes]
            "view_own_permissions",                 // view own permissions                                         [Done: check roleRequestRoutes]
            "view_own_full_details",                // view all details concerning self                             [Done: check clientRoutes, managerRoutes, adminRoutes]

            // Client permissions
            "view_watchlist",                       // view client's watchlist                                      [Done: check clientRoutes]
            "view_favlist",                         // view client's favlist                                        [Done: check clientRoutes]
            "add_content_to_watchlist",             // add content to watchlist                                     [Done: check clientRoutes]
            "add_content_to_favlist",               // add content to favlist                                       [Done: check clientRoutes]
            "delete_content_from_watchlist",        // delete content from watchlist                                [Done: check clientRoutes]
            "delete_content_from_favlist",          // delete content from favlist                                  [Done: check clientRoutes]    
            

            // Role request permissions
            "request_role_upgrade",                 // request role upgrade                                         [Done: check roleRequestRoutes]
            "check_if_role_request_pending",        // check if role request is pending                             [Done: check roleRequestRoutes]
            // "request_delete_to_manager",            // request to delete own user details to MANAGER

            // Content permissions
            "view_content",                         // view content details                                         [Done: check contentRoutes]

            // // Subscription permissions
            // "create_own_subscription",              // create new subscription (self)
            // "view_own_subscription",                // view own subscription details
            // "cancel_own_subscription",              // cancel own subscription
        ],
    },
    manager: {
        name: "manager",
        inherits: ["client"], // inherits permissions from CLIENT
        permissions: [
            // User permissions
            "view_client",                          // view CLIENT user details                                     [Done: check managerRoutes, adminRoutes]
            "view_manager",                         // view MANAGER user details                                    [Done: check managerRoutes, adminRoutes]
            // "delete_client",                        // delete CLIENT user

            // Role request permissions
            "view_pending_manager_role_requests",   // view pending MANAGER role requests                           [Done: check managerRoutes, adminRoutes]
            "process_manager_role_request",         // APPROVE/REJECT role requests from CLIENT to MANAGER          [Done: check managerRoutes, adminRoutes]
            // "request_delete_to_admin",              // request to delete own user details to ADMIN
            
            // Content permissions
            "create_content",                       // create new content                                           [Done: check managerRoutes, adminRoutes]
            "edit_content",                         // edit existing content                                        [Done: check managerRoutes, adminRoutes]
            "delete_content",                       // delete content                                               [Done: check managerRoutes, adminRoutes]

            // // Subscription permissions
            // "view_subscription",                    // view subscription details

            // // Reports permissions
            // "view_reports",                         // view various reports
            // "generate_reports",                     // generate new reports
        ],
    },
    admin: {
        name: "admin",
        inherits: ["manager"], // inherits permissions from MANAGER (and thus CLIENT)
        permissions: [
            // User permissions
            // "delete_manager",                       // delete MANAGER user
            // "delete_admin",                         // delete ADMIN user
            "view_admin",                           // view ADMIN user details                                      [Done: check adminRoutes]
            // "request_delete_to_another_admin",      // request to delete own user details to another admin

            // Role request permissions
            "view_pending_admin_role_requests",     // view pending admin role requests                             [Done: check adminRoutes]
            "process_admin_role_request",           // APPROVE/REJECT role requests from CLIENT/MANAGER to ADMIN    [Done: check adminRoutes]

            // // Subscription permissions
            // "create_subscription",                  // create new subscription plans
            // "edit_subscription",                    // edit subscription plans
            // "delete_subscription",                  // delete subscription plans
            
            // // Auditing and settings permissions
            // "manage_system_settings",               // manage system settings
            // "view_audit_logs",                      // view audit logs

            // // Manage role-permissions
            // "manage_roles",                         // create, edit, delete roles and permissions
        ],
    },
};

export const roleNames = {
    client: roles.client.name,
    manager: roles.manager.name,
    admin: roles.admin.name,
};

export const roleRequestStatus = {
    pending: "pending",
    approved: "approved",
    rejected: "rejected",
};

export const actionsOnRoleRequests = {
    approve: "approve",
    reject: "reject",
};

export const getRolePermissions = (roleKey) => {
    const role = roles[roleKey.toLowerCase()];
    let permissions = new Set(role.permissions);

    if (role.inherits) {
        for (const parentRoleKey of role.inherits) {
            const parentPermissions = getRolePermissions(parentRoleKey);
            for (const perm of parentPermissions) {
                permissions.add(perm);
            }
        }
    }
    return Array.from(permissions);
}