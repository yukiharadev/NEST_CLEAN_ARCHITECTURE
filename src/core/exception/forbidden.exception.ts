import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

export class ForbiddenException extends BaseException {
    constructor(
        message: string = 'Forbidden',
        details?: Record<string, unknown>,
    ) {
        super(message, HttpStatus.FORBIDDEN, 'Forbidden', details);
    }
}

