import { ICommandHandler, EventBus } from '@nestjs/cqrs';
import { ICommand } from '../commands/ICommand';

export abstract class CommandHandlerBase<
  TCommand extends ICommand<TResult>,
  TResult = void,
> implements ICommandHandler<ICommand<TResult>>
{
  constructor(protected readonly eventBus: EventBus) {}

  abstract handle(command: TCommand): Promise<TResult>;

  async execute(command: TCommand): Promise<TResult> {
    return this.handle(command);
  }
}
