import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ICommand } from './commands/ICommand';
import { IQuery } from './queries/Query';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CqrsBus {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }


    execute<TResult>(command: ICommand<TResult>): Promise<TResult> {
        return this.commandBus.execute(command);
    }

    query<TResult>(query: IQuery<TResult>): Promise<TResult> {
        return this.queryBus.execute(query);
    }
}