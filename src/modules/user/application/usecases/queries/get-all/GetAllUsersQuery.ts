import { IQuery } from '@core/cqrs/queries/Query';
import { PaginatedRequest } from '@core/database/repositories/IRepositoryService';

export class GetAllUsersQuery implements IQuery<void> {
  constructor() {}
}
