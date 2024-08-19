import express from "express";
import cors from "cors";
import path from "path"

// Mongo database config for establishing connection
import dbConnect from "../config/mongo.config.js";

// Error-handling middlewares
import {
    globalErrorHandler,
    notFound
} from "../middlewares/error-handler.middleware.js";

// contentData@sagar basak
import { contentData } from "../tests/content-data.js";

// Routes
import userRoutes from "../routes/user.routes.js";
import clientRoutes from "../routes/client.routes.js";
import managerRoutes from "../routes/manager.routes.js";
import adminRoutes from "../routes/admin.routes.js";
import contentRoutes from "../routes/content.routes.js";
import roleRequestRoutes from "../routes/role-request.routes.js";

// Connect database
dbConnect();

const app = express();

app.use(cors());

// Middleware to automatically parse incoming JSON requests
// Parses JSON payloads and makes the resulting JSON object available as req.body in route handlers.
app.use(express.json());

// Serve static files from the content-videos directory
const videoDirectory = path.join(path.resolve(), 'content-videos');
app.use('/content-videos', express.static(videoDirectory));

// search function for frontend
app.get('/api/search', async (req, res) => {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }
  
    try {
      const results = searchContent(query);
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching search results' });
    }
  });
  
  const searchContent = (query) => {
    return contentData.filter(content =>
      content.title.toLowerCase().includes(query.toLowerCase())
    );
  };

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/clients", clientRoutes);
app.use("/api/v1/managers", managerRoutes);
app.use("/api/v1/admins", adminRoutes);
app.use("/api/v1/contents", contentRoutes);
app.use("/api/v1/roles", roleRequestRoutes);

app.use(notFound);
app.use(globalErrorHandler)

export default app;