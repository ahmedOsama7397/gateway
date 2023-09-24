import { NextFunction, Request, Response, response } from "express";

export const checkPlatform = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {

    if (!req.headers.x_platform) {
        return res.status(422).send('you need to set x_platform !');
    }

    next();
}