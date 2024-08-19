import expressAsyncHandler from "express-async-handler";
import fs from "fs"
import { v4 as uuidv4 } from "uuid"
import { exec } from "child_process"

import { genresArray } from "../config/content-genre.config.js";
import { roleNames } from "../config/roles-and-permissions.config.js";

import Content from "../models/content.model.js";

import {
    deleteFromCloudinary,
    uploadToCloudinary
} from "../utils/cloudinary.utils.js";

const { client, manager, admin } = roleNames;

// Helper function to remove duplicates from an array
// Self note: 
// Array to Set using Set
// Set to Array using [... <set>]
const removeDuplicates = (arr) => [...new Set(arr)];

// @desc   Create new content
// @route  POST /api/v1/contents/create
// @access Private [Manager, Admin]
export const createContent = expressAsyncHandler(async (req, res) => {
    // Retrieve text data from the form
    const {
        title,
        description,
        genre,
        releaseYear,
        directorName,
        castName,
        duration,
        rating,
        // thumbnailUrl,
        // posterUrl,
        // videoUrl,
    } = req.body;

    // Check if all required fields are provided
    if (!title || !genre || !directorName || !castName || !duration || !rating) {
        const err = new Error("Required fields need to be mentioned in the request body");
        err.statusCode = 400;
        throw err;
    }

    // Checking to see if content already exists
    const existingContent = await Content.findOne({
        title,
        directorName
    });

    if (existingContent) {
        const err = new Error("Content with the same title and director already exists");
        err.statusCode = 409;
        throw err;
    }

    const processedGenreArray = removeDuplicates(genre);
    processedGenreArray.forEach(processedGenre => {
        if (!genresArray.includes(processedGenre)) {
            const err = new Error(`Genre ${processedGenre} doesn't exist`);
            err.statusCode = 400;
            throw err;
        }
    });
    const processedCastName = removeDuplicates(castName);

    // Upload thumbnail and poster to Cloudinary [video to be dealt later]
    let thumbnailData = null;
    let posterData = null;
    let videoUrl = "https://example.com/placeholder-video.mp4";

    if (req?.files?.thumbnail) {
        const thumbnail = req.files.thumbnail[0];
        thumbnailData = await uploadToCloudinary(thumbnail, "ott-backend/thumbnails");
    }

    if (req?.files?.poster) {
        const poster = req.files.poster[0];
        posterData = await uploadToCloudinary(poster, "ott-backend/posters");
    }

    if (req?.files?.video) {
        const contentVideoId = uuidv4();
        const videoPath = req.files.video[0].path;
        const outputPath = `./content-videos/${contentVideoId}`;
        const hlsPath = `${outputPath}/index.m3u8`;

        if (!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath, { recursive: true });
        }

        // Wrapping exec in a Promise
        const transcodeVideo = (videoPath, hlsPath, outputPath) => {
            return new Promise((resolve, reject) => {
                const ffmpegCommand = `ffmpeg -i ${videoPath} -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/segment%03d.ts" -start_number 0 ${hlsPath}`;
                exec(ffmpegCommand, (error, stdout, stderr) => {
                    if (error) {
                        reject(`exec error: ${error}`);
                    }
                    console.log(`stdout: ${stdout}`);
                    console.log(`stderr: ${stderr}`);
                    const PORT = process.env.PORT || 8000;
                    resolve(`http://localhost:${PORT}/content-videos/${contentVideoId}/index.m3u8`);
                });
            });
        };

        try {
            videoUrl = await transcodeVideo(videoPath, hlsPath, outputPath);

            fs.unlink(videoPath, (err) => {
                if (err) {
                    console.error(`Failed to delete video file: ${err.message}`);
                }
            });
        } catch (error) {
            console.error(error);
            throw new Error("Video transcoding failed");
        }
    }

    // Create a new content instance
    const content = new Content({
        title,
        description,
        genre: processedGenreArray,
        releaseYear,
        directorName,
        castName: processedCastName,
        duration,
        rating,
        thumbnailPublicId: thumbnailData.public_id,
        thumbnailUrl: thumbnailData.url,
        posterPublicId: posterData.public_id,
        posterUrl: posterData.url,
        videoUrl,
        addedBy: {
            _id: req.user._id,
            role: req.user.role,
        },
        editedBy: {
            _id: req.user._id,
            role: req.user.role,
        },
    });

    // Save the new content to the database
    await content.save();

    // Return success response
    res.status(201).json({
        status: "Success",
        message: "Content created successfully",
        data: content,
    });
});

// @desc   Get content by contentId
// @route  GET /api/v1/contents/view/:contentId
// @access Public
export const getContentById = expressAsyncHandler(async (req, res) => {
    const { contentId } = req.params;

    if (!contentId) {
        const err = new Error("contentId missing as query parameter");
        err.statusCode = 404;
        throw err;
    }

    let content;

    if (req.user.role === client) {
        content = await Content.findById(contentId).select("-thumbnailPublicId -posterPublicId -addedBy -editedBy -createdAt -updatedAt");
    } else {
        content = await Content.findById(contentId);
    }

    if (!content) {
        const err = new Error("Content not found");
        err.statusCode = 404;
        throw err;
    }

    return res.status(200).json({
        status: "Success",
        message: "Content retrieved successfully",
        data: content,
    });
});

// @desc   Get all content
// @route  GET /api/v1/contents/view
// @access Public
export const getAllContentData = expressAsyncHandler(async (req, res) => {
    let contentList;

    if (req.user._id === client) {
        Content.find({}, { thumbnailPublicId: 0, posterPublicId: 0, addedBy: 0, editedBy: 0, createdAt: 0, updatedAt: 0 });
    } else {
        contentList = await Content.find();
    }

    res.status(200).json({
        status: "Success",
        message: "Content data retrieved successfully",
        data: contentList,
    });
});

// @desc   Edit content by ID
// @route  PUT /api/v1/contents/edit/:contentId
// @access Private [Manager, Admin]
export const editContentById = expressAsyncHandler(async (req, res) => {
    const { contentId } = req.params;

    if (!contentId) {
        const err = new Error("contentId missing as query parameter");
        err.statusCode = 404;
        throw err;
    }

    const content = await Content.findById(contentId);
    if (!content) {
        const err = new Error("Content not found");
        err.statusCode = 404;
        throw err;
    }

    if (req?.files?.thumbnail) {
        const thumbnail = req.files.thumbnail[0];
        const thumbnailData = await uploadToCloudinary(thumbnail, "ott-api/thumbnails");

        // Delete old thumbnail
        if (content.thumbnailPublicId) {
            await deleteFromCloudinary(content.thumbnailPublicId);
        }

        req.body.thumbnailPublicId = thumbnailData.public_id;
        req.body.thumbnailUrl = thumbnailData.url;
    }

    if (req?.files?.poster) {
        const poster = req.files.poster[0];
        const posterData = await uploadToCloudinary(poster, "ott-api/posters");

        // Delete old poster
        if (content.posterPublicId) {
            await deleteFromCloudinary(content.posterPublicId);
        }

        req.body.posterPublicId = posterData.public_id;
        req.body.posterUrl = posterData.url;
    }

    req.body.editedBy = {
        _id: req.user._id,
        role: req.user.role,
    };

    const updatedContent = await Content.findByIdAndUpdate(contentId, req.body, {
        new: true,
        runValidators: true,
    });

    if (!updatedContent) {
        const err = new Error("Content not found after update");
        err.statusCode = 404;
        throw err;
    }

    return res.status(200).json({
        status: "Success",
        message: "Content updated successfully",
        data: updatedContent,
    });
});

// Not yet fully implemented
// @desc   Delete content by ID
// @route  DELETE /api/v1/contents/delete/:contentId
// @access Private [Manager, Admin]
export const deleteContentById = expressAsyncHandler(async (req, res) => {
    const { contentId } = req.params;

    if (!contentId) {
        const err = new Error("contentId missing as query parameter");
        err.statusCode = 404;
        throw err;
    }

    const content = await Content.findByIdAndDelete(contentId);

    if (!content) {
        const err = new Error("Content not found");
        err.statusCode = 404;
        throw err;
    } else {
        console.log(content);
    }

    res.status(200).json({
        status: "Success",
        message: "Content deleted successfully",
    });
});