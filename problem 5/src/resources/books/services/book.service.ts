import { Book } from "../models/book.model";
import { BookAttributes, BookInput } from "../types/book.types"


const getAllBooks = async (): Promise<BookAttributes[]> => {
    return await Book.findAll();
}

const getBookById = async (id: number): Promise<BookAttributes | null> => {
    return await Book.findByPk(id);
}

const createBook = async (payload: BookInput): Promise<BookAttributes> => {
    const book = await Book.create(payload);
    return book.toJSON() as BookAttributes;
}

const updateBook = async (id: number, payload: Partial<BookInput>): Promise<BookAttributes | null> => {
    const book = await Book.findByPk(id);
    if (!book) return null;

    await book.update(payload);
    return book.toJSON() as BookAttributes;
}

const deleteBook = async (id: number): Promise<boolean> => {
    const deletedCount = await Book.destroy({ where: { id } });
    return deletedCount > 0;
}

const bookService = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
};
export default bookService;


