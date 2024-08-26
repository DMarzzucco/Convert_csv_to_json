import { BadRequestException, Injectable, NestMiddleware } from "@nestjs/common";
import * as multer from "multer"
import { Request, Response, NextFunction } from "express";

const storage = multer.memoryStorage();
const upload = multer({ storage })

@Injectable()
export class MulterMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        try{
            upload.single("file")(req, res, (error) => {
                if (error) {
                    return res.status(400).json({ message: `Error in the middleware user models: ${error.message}` })
                }
                next();
            });
        }catch(error){
            console.error(`Error in MultterMiddleware ${error.message}`)
            throw new BadRequestException(`Error in MulterMiddleware ${error.message}`)
        }
    }
}