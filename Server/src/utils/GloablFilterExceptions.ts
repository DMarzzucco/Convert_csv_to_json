import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Response } from "express";

@Catch()
export class GlobalFilterException implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {

        const context = host.switchToHttp();
        const response = context.getResponse<Response>();

        const status = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR

        const message = exception instanceof HttpException
            ? (exception.getResponse() as string | object)
            : (exception as Error).message || "Unkowed error occurred"

        response.status(status).json({
            statusCode: status,
            message: message
        });
    }
}