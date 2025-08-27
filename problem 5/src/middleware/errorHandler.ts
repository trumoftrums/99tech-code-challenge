import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exceptions/httpException";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const status = err instanceof HttpException ? err.status : 500;
    const message = err.message || "Something went wrong";

    res.status(status).json({ status, message });
};
