import { IQueryHandler } from '@nestjs/cqrs';
import { IQuery } from '../queries/Query';

export abstract class QueryHandlerBase<
  TQuery extends IQuery<TResult>,
  TResult = void,
> implements IQueryHandler<IQuery<TResult>, TResult>
{
  abstract handle(query: TQuery): Promise<TResult>;

  async execute(query: TQuery): Promise<TResult> {
    return this.handle(query);
  }
}