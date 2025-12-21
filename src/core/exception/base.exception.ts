import { HttpException, HttpStatus } from '@nestjs/common';

export interface ExceptionResponse {
    message: string;
    statusCode: number;
    error?: string;
    details?: Record<string, unknown>;
}

export abstract class BaseException extends HttpException {
    constructor(
        message: string,
        statusCode: HttpStatus,
        error?: string,
        details?: Record<string, unknown>,
    ) {
        const response: ExceptionResponse = {
            message,
            statusCode,
            error: error ?? HttpStatus[statusCode],
            details,
        };
        super(response, statusCode);
    }

    getExceptionResponse(): ExceptionResponse {
        return this.getResponse() as ExceptionResponse;
    }
}

