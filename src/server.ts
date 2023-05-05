import express from 'express';
import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import bodyParser from "body-parser";
import { Routes } from './route';
import morgan from 'morgan';

dotenv.config();

class App {

    app: express.Application;

    constructor() {
        const NODE_ENV = process.env.NODE_ENV;
        this.app = express();
        this.app.use(bodyParser.json({ limit: "50mb" }));
        this.app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
        this.app.use(bodyParser.json(), (error, req, res, next) => {
            if (error) {
                return res.status(400).json({ message: req.t("ERR_GENRIC_SYNTAX") });
            }
            next();
        });
        this.app.use(bodyParser.json({ type: "application/vnd.api+json" }));
        this.app.use(morgan("dev"))
        const routes = new Routes();

        this.app.all("/*", (req, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Request-Headers", "*");

            res.header(
                "Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers, Accept-Language, Authorization"
            );
            res.header("Access-Control-Allow-Methods", "GET, POST ,PUT ,DELETE ,PATCH");
            if (req.method === "OPTIONS") {
                // res.writeHead(constant.RES_CODE.success);
                res.end();
            } else {
                next();
            }
        });
        this.app.use("/api", routes.path());
        this.app.get('/try', (req: any, res: any) => {
            res.send("welcome")
        })

        this.app.use(async (err, req, res, next) => {
            if (err) {
                // logger.error(err);
                return res
                    .status(err.code)
                    .send({
                        // status: constant.RES_STATUS.FAIL, error: err.error
                    });
            } else {
                next();
            }
        });


    }
}

export default new App().app;
