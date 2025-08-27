import { z } from "zod";

export const createBookSchema = z.object({
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
    publishedYear: z.number().int("Year must be valid"),
    description: z.string().optional(),
});

// For updating, all fields optional
export const updateBookSchema = createBookSchema.partial();

export type CreateBookInput = z.infer<typeof createBookSchema>;
export type UpdateBookInput = z.infer<typeof updateBookSchema>;
