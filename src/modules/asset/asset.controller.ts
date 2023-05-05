import { Request, Response } from 'express';
import { AssetService } from './asset.service';


export class AssetController {
    private assetService: AssetService;
    constructor() {
        this.assetService = new AssetService();
    }
    public dashboard = async (req, res) => {
        try {
            const data = await this.assetService.dashboard()
            return res.status(200).json(data);

        } catch (error) {
            return res.status(error.code).json(error);
        }

    }
}