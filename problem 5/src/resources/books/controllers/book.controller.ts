import { Request, Response } from "express";
import bookService from "../services/book.service";

export const createBook = async (req: Request, res: Response) => {
    try {
        const book = await bookService.createBook(req.body);
        res.status(201).json(book);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllBooks = async (req: Request, res: Response) => {
    try {
        const books = await bookService.getAllBooks();
        res.json(books);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const getBookById = async (req: Request, res: Response) => {
    try {
        const book = await bookService.getBookById(Number(req.params.id));
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.json(book);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const updateBook = async (req: Request, res: Response) => {
    try {
        const updated = await bookService.updateBook(Number(req.params.id), req.body);
        if (!updated) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.json(updated);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteBook = async (req: Request, res: Response) => {
    try {
        const deleted = await bookService.deleteBook(Number(req.params.id));
        if (!deleted) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.json({ message: "Book deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

