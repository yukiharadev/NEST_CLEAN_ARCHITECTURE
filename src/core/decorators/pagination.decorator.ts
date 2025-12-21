import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export interface PaginationParams {
  page: number;
  limit: number;
  skip: number;
}

export const Pagination = createParamDecorator(
  (data: { defaultLimit?: number; maxLimit?: number } = {}, ctx: ExecutionContext): PaginationParams => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const { defaultLimit = 10, maxLimit = 100 } = data;

    let page = parseInt(request.query.page as string, 10) || 1;
    let limit = parseInt(request.query.limit as string, 10) || defaultLimit;

    if (page < 1) page = 1;
    if (limit < 1) limit = defaultLimit;
    if (limit > maxLimit) limit = maxLimit;

    const skip = (page - 1) * limit;

    return { page, limit, skip };
  },
);
