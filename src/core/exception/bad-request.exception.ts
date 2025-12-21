import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

export class BadRequestException extends BaseException {
    constructor(
        message: string = 'Bad Request',
        details?: Record<string, unknown>,
    ) {
        super(message, HttpStatus.BAD_REQUEST, 'Bad Request', details);
    }
}

