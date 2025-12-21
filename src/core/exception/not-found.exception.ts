import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

export class NotFoundException extends BaseException {
    constructor(
        message: string = 'Resource Not Found',
        details?: Record<string, unknown>,
    ) {
        super(message, HttpStatus.NOT_FOUND, 'Not Found', details);
    }
}

