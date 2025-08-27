import { Router } from "express";
import { createBook, getAllBooks, getBookById, updateBook, deleteBook } from "../controllers/book.controller";
import validateRequest from "../../../middleware/validate.middleware";
import { createBookSchema, updateBookSchema } from "../schemas/book.schema";

const router = Router();

// Create a new book
router.post("/", validateRequest(createBookSchema), createBook);

// Get all books
router.get("/", getAllBooks);

// Get a book by ID
router.get("/:id", getBookById);

// Update a book by ID
router.put("/:id", validateRequest(updateBookSchema), updateBook);

// Delete a book by ID
router.delete("/:id", deleteBook);

export default router;
