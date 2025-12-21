import { IEventHandler } from '@nestjs/cqrs';
import { IEvent } from '../events/IEvent';

export abstract class EventHandlerBase<TEvent extends IEvent>
  implements IEventHandler<TEvent>
{
  abstract handle(event: TEvent): Promise<void>;
}