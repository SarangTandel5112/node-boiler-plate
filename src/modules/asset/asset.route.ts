import { Router } from "express";
import { ASSET_ROUTES } from "../../config/routes";
import { AssetController } from "./asset.controller";


// Assign router to the express.Router() instance
const router: Router = Router();
const assetController: AssetController = new AssetController()


//Dashboard
router.get(ASSET_ROUTES.DASHBOARD, assetController.dashboard);
export const AssetRoute: Router = router;
