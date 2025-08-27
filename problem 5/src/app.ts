import express, { Application } from "express";
import helmet from "helmet";
import cors from "cors";
import bookRoutes from "./resources/books/routes/book.routes";
import { errorHandler } from "./middleware/errorHandler";

const app: Application = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/books", bookRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
