import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

export class UnAuthorizedException extends BaseException {
    constructor(
        message: string = 'Unauthorized',
        details?: Record<string, unknown>,
    ) {
        super(message, HttpStatus.UNAUTHORIZED, 'Unauthorized', details);
    }
}

