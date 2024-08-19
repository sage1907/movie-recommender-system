import expressAsyncHandler from "express-async-handler";

import Client from "../models/client.model.js";
import Manager from "../models/manager.model.js";
import Admin from "../models/admin.model.js";

// Helper function to register Client, Manager, Admin Collections
export const registerClient = expressAsyncHandler(async (id) => {
    const existingClient = await Client.findById(id);
    if (existingClient) {
        console.log(`Client with userId ${id} already exists.`);
        return;
    }
    const client = new Client({ _id: id });
    await client.save();
    console.log(`Client with userId ${id} created.`);
});

export const registerManager = expressAsyncHandler(async (id) => {
    const existingManager = await Manager.findById(id);
    if (existingManager) {
        console.log(`Manager with userId ${id} already exists.`);
        return;
    }
    const manager = new Manager({ _id: id });
    await manager.save();
    console.log(`Manager with userId ${id} created.`);
});

export const registerAdmin = expressAsyncHandler(async (id) => {
    const existingAdmin = await Admin.findById(id);
    if (existingAdmin) {
        console.log(`Admin with userId ${id} already exists.`);
        return;
    }
    const admin = new Admin({ _id: id });
    await admin.save();
    console.log(`Admin with userId ${id} created.`);
});

export const migrateManagerToAdmin = expressAsyncHandler(async (id) => {
    // Finding out the manager document
    const manager = await Manager.findById(id);

    if (!manager) {
        console.log(`Manager with ID ${id} not found`);
        return;
    }

    // Preparing the update object
    const updateFields = {
        approvedUserIds: manager.approvedUserIds.map(user => ({
            _id: user._id,
            approvedRole: user.approvedRole,
            approvedAt: user.approvedAt,
        })),

        rejectedUserIds: manager.rejectedUserIds.map(user => ({
            _id: user._id,
            rejectedRole: user.rejectedRole,
            rejectedAt: user.rejectedAt,
        })),

        addedContentIds: manager.addedContentIds.map(content => ({
            _id: content._id,
            addedAt: content.addedAt,
        })),

        editedContentIds: manager.editedContentIds.map(content => ({
            _id: content._id,
            editedAt: content.editedAt,
        })),

        removedContentIds: manager.removedContentIds.map(content => ({
            _id: content._id,
            removedAt: content.removedAt,
        })),
    };


    // Updating the admin document created by the registerAdmin function called by the save pre-hook
    await Admin.findByIdAndUpdate(
        id,
        { $set: updateFields },
        { upsert: true, new: true },
    );
    // Self-note:
    // 1. set: updateFields: Sets the fields in the admin document to the values in updateFields.
    // 2. upsert: true: If no document with the specified ID exists, a new document is created.
    // 3. new: true: Returns the modified document rather than the original.
    // 4. Learn about javascript Array Map method

    // Delete the manager document
    await Manager.findByIdAndDelete(id);

    console.log(`Manager with ID ${id} migrated to Admin successfully`);
});