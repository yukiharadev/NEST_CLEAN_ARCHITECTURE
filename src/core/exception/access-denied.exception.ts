import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

export class AccessDeniedException extends BaseException {
    constructor(
        message: string = 'Access Denied',
        details?: Record<string, unknown>,
    ) {
        super(message, HttpStatus.FORBIDDEN, 'Access Denied', details);
    }
}

