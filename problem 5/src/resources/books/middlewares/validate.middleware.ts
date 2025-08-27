import { Request, Response, NextFunction } from "express";
import { ZodError, ZodObject } from "zod";

const validate =
    (schema: ZodObject) =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                schema.parse(req.body);
                next();
            } catch (error) {
                if (error instanceof ZodError) {
                    return res.status(400).json({
                        success: false,
                        errors: error.flatten().fieldErrors,
                    });
                }
                next(error);
            }
        };

export default validate;
