import { Injectable, NestMiddleware } from "@nestjs/common";
import * as multer from "multer";
import { Request, Response, NextFunction } from "express";

const storage = multer.memoryStorage();
const upload = multer({ storage })

@Injectable()
export class MulterMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        upload.single("file")(req, res, next)
    }
}