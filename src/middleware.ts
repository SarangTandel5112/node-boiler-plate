import { Log } from "./helpers/logger";
import { Request, Response, NextFunction } from "express";

export class Middleware {
    private logger = new Log();


    public authenticateUser = async (req, res, next: () => void) => {
        try {
            
            next()

        } catch (error) {


        }
    };
}
