import { Injectable, Logger } from "@nestjs/common";
import { EventsHandler } from "@nestjs/cqrs";
import { EventHandlerBase } from "@core/cqrs/handlers/EventHandlerBase";
import { UserCreatedEvent } from "../../../domain/events/user-created.event";

@Injectable()
@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler extends EventHandlerBase<UserCreatedEvent> {
    // eslint-disable-next-line @typescript-eslint/require-await
    async handle(event: UserCreatedEvent): Promise<void> {

        Logger.log(`User created event handled for user ID: ${event.userId}, Name: ${event.userName}, Email: ${event.userEmail}`, UserCreatedHandler.name);
    }
}

