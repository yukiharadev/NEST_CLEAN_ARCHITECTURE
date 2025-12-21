import { IQuery } from '@core/cqrs/queries/Query';
import { PaginatedRequest } from '@core/database/repositories/IRepositoryService';

export class GetPagedUsersQuery implements IQuery<PaginatedRequest> {
  constructor(
    public readonly pageIndex: number = 1,
    public readonly pageSize: number = 10,
  ) {}
}
