import { Request, Response } from "express";
import bookService from "../services/book.service";
import { BookFilter } from "../types/book.types";
import { HttpException } from "../../../exceptions/httpException";

export const createBook = async (req: Request, res: Response) => {
    const book = await bookService.createBook(req.body);
    res.status(201).json(book);
}

export const getAllBooks = async (req: Request, res: Response) => {
    const filter: BookFilter = {};
    if (req.query.publishedYear) {
        filter.publishedYear = Number(req.query.publishedYear);
    }
    const books = await bookService.getAllBooks(filter);
    res.json(books);
}

export const getBookById = async (req: Request, res: Response) => {
    const book = await bookService.getBookById(Number(req.params.id));
    if (!book) throw new HttpException(404, "Book not found");
    res.json(book);
}

export const updateBook = async (req: Request, res: Response) => {
    const updated = await bookService.updateBook(Number(req.params.id), req.body);
    if (!updated) throw new HttpException(404, "Book not found");
    res.json(updated);
}

export const deleteBook = async (req: Request, res: Response) => {
    const deleted = await bookService.deleteBook(Number(req.params.id));
    if (!deleted) throw new HttpException(404, "Book not found");
    res.json({ message: "Book deleted successfully" });
}

