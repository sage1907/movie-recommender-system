import expressAsyncHandler from "express-async-handler";

import Client from "../models/client.model.js";
import Content from "../models/content.model.js";

// @desc   View own full user details
// @route  POST /api/v1/clients/view-my-details
// @access Private [Client]
export const viewFullUserDetails = expressAsyncHandler(async (req, res) => {
    // Initialize userDetails object
    let userDetails = {};

    // Populate userDetails with user PII
    userDetails.userPII = req.user;

    // Fetch client activity from Client collection
    const clientActivity = await Client.findById(req.user._id).select("-_id");

    // Handle case where client activity is not found
    if (!clientActivity) {
        const err = new Error("Client activity not found");
        err.statusCode = 404;
        throw err;
    }

    // Add client activity to clientDetails
    userDetails.clientActivity = clientActivity;

    // Send the response
    res.status(200).json({
        status: true,
        message: "Full user details received successfully",
        data: userDetails,
    });
});

// @desc   View watchlist details
// @route  GET /api/v1/clients/watchlist
// @access Private
export const getWatchlistDetails = expressAsyncHandler(async (req, res) => {
    const client = await Client.findById(req.user._id).populate("watchList._id", "title thumbnailUrl");

    if (!client) {
        const err = new Error("Client not found");
        err.statusCode = 404;
        throw err;
    }

    res.status(200).json({
        status: true,
        message: "Watchlist details received successfully",
        data: client.watchList,
    });
});

// @desc   View favourites list details
// @route  GET /api/v1/clients/favlist
// @access Private
export const getFavlistDetails = expressAsyncHandler(async (req, res) => {
    const client = await Client.findById(req.user._id).populate("favouritesList._id", "title thumbnailUrl");

    if (!client) {
        const err = new Error("Client not found");
        err.statusCode = 404;
        throw err;
    }

    res.status(200).json({
        status: true,
        message: "Favourites list details received successfully",
        data: client.favouritesList,
    });
});

// @desc   Add content to watchlist
// @route  PUT /api/v1/clients/watchlist/:contentId
// @access Private
export const addToWatchlist = expressAsyncHandler(async (req, res) => {
    const contentId = req.params.contentId;

    // Check if content exists
    const content = await Content.findById(contentId);
    if (!content) {
        const err = new Error("Content not found");
        err.statusCode = 404;
        throw err;
    }

    // Find the client and update watchlist
    const client = await Client.findByIdAndUpdate(
        req.user._id,
        {
            $addToSet: { watchList: { _id: contentId, addedAt: Date.now() } },
        },
        { new: true }
    );

    if (!client) {
        const err = new Error("Client not found");
        err.statusCode = 404;
        throw err;
    }

    res.status(200).json({
        status: true,
        message: "Content added to watchlist successfully",
        data: client.watchList,
    });
});

// @desc   Add content to favourites list
// @route  PUT /api/v1/clients/favlist/:contentId
// @access Private
export const addToFavlist = expressAsyncHandler(async (req, res) => {
    const contentId = req.params.contentId;

    // Check if content exists
    const content = await Content.findById(contentId);
    if (!content) {
        const err = new Error("Content not found");
        err.statusCode = 404;
        throw err;
    }

    // Find the client and update favourites list
    const client = await Client.findByIdAndUpdate(
        req.user._id,
        {
            $addToSet: { favouritesList: { _id: contentId, addedAt: Date.now() } },
        },
        { new: true }
    );

    if (!client) {
        const err = new Error("Client not found");
        err.statusCode = 404;
        throw err;
    }

    res.status(200).json({
        status: true,
        message: "Content added to favourites list successfully",
        data: client.favouritesList,
    });
});

// @desc   Delete content from watchlist
// @route  DELETE /api/v1/clients/watchlist/:contentId
// @access Private
export const deleteFromWatchlist = expressAsyncHandler(async (req, res) => {
    const contentId = req.params.contentId;

    // Find the client and remove content from watchlist
    const client = await Client.findByIdAndUpdate(
        req.user._id,
        {
            $pull: { watchList: { _id: contentId } },
        },
        { new: true }
    );

    if (!client) {
        const err = new Error("Client not found");
        err.statusCode = 404;
        throw err;
    }

    res.status(200).json({
        status: true,
        message: "Content removed from watchlist successfully",
        // data: client.watchList,
    });
});

// @desc   Delete content from favourites list
// @route  DELETE /api/v1/clients/favlist/:contentId
// @access Private
export const deleteFromFavlist = expressAsyncHandler(async (req, res) => {
    const contentId = req.params.contentId;

    // Find the client and remove content from favourites list
    const client = await Client.findByIdAndUpdate(
        req.user._id,
        {
            $pull: { favouritesList: { _id: contentId } },
        },
        { new: true }
    );

    if (!client) {
        const err = new Error("Client not found");
        err.statusCode = 404;
        throw err;
    }

    res.status(200).json({
        status: true,
        message: "Content removed from favourites list successfully",
        // data: client.favouritesList,
    });
});