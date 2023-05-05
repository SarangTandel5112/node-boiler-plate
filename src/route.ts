import { Request, Response } from "express";
import * as express from "express";
import { AssetRoute } from "./modules/asset/asset.route";
import { Middleware } from "./middleware";
export class Routes {
  private middleware = new Middleware();
  protected basePath: string;

  constructor() {
    this.basePath = "/app/public";
  }

  public defaultRoute(req: Request, res: Response) {
    res.json({
      message: "Hello!",
    });
  }

  public path() {
    const router = express.Router();
    router.use("/asset", AssetRoute);

    router.all("/*", (req: Request, res: Response) => {
      return res.status(404).json({
        message: "ERR_URL_NOT_FOUND",
      });
    });
    return router;
  }
}
