import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseException, ExceptionResponse } from './base.exception';

export interface GlobalExceptionResponse {
    message: string;
    statusCode: number;
    error: string;
    timestamp: string;
    path: string;
    details?: Record<string, unknown>;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(GlobalExceptionFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const { status, body } = this.buildResponse(exception, request);

        this.logException(exception, request, status);

        response.status(status).json(body);
    }

    private buildResponse(
        exception: unknown,
        request: Request,
    ): { status: number; body: GlobalExceptionResponse } {
        const timestamp = new Date().toISOString();
        const path = request.url;

        if (exception instanceof BaseException) {
            const exceptionResponse = exception.getExceptionResponse();
            return {
                status: exception.getStatus(),
                body: {
                    message: exceptionResponse.message,
                    statusCode: exceptionResponse.statusCode,
                    error: exceptionResponse.error ?? 'Error',
                    timestamp,
                    path,
                    details: exceptionResponse.details,
                },
            };
        }

        if (exception instanceof HttpException) {
            const status = exception.getStatus();
            const res = exception.getResponse();
            const exceptionResponse =
                typeof res === 'string'
                    ? { message: res, statusCode: status }
                    : (res as ExceptionResponse);

            return {
                status,
                body: {
                    message: exceptionResponse.message ?? 'Error',
                    statusCode: status,
                    error: exceptionResponse.error ?? HttpStatus[status],
                    timestamp,
                    path,
                },
            };
        }

        // Handle unknown exceptions
        const message =
            exception instanceof Error
                ? exception.message
                : 'Internal server error';

        return {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            body: {
                message,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Internal Server Error',
                timestamp,
                path,
            },
        };
    }

    private logException(
        exception: unknown,
        request: Request,
        status: number,
    ): void {
        const message =
            exception instanceof Error ? exception.message : 'Unknown error';
        const stack = exception instanceof Error ? exception.stack : undefined;

        if (status >= 500) {
            this.logger.error(
                `[${request.method}] ${request.url} - ${status}: ${message}`,
                stack,
            );
        } else {
            this.logger.warn(
                `[${request.method}] ${request.url} - ${status}: ${message}`,
            );
        }
    }
}
