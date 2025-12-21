// application/usecases/commands/create-user.handler.ts
import { Injectable } from "@nestjs/common";
import { CommandHandler, EventBus } from "@nestjs/cqrs";
import { CommandHandlerBase } from "@core/cqrs/handlers/CommandHandlerBase";
import { CreateUserCommand } from "./CreateUserCommand";
import { Inject } from "@nestjs/common";
import { USER_SERVICE_TOKEN } from "@modules/user/application/services/IUserService";


@CommandHandler(CreateUserCommand)
@Injectable()
export class CreateUserHandler extends CommandHandlerBase<CreateUserCommand, boolean> {
    constructor(
        eventBus: EventBus,
        @Inject(USER_SERVICE_TOKEN)
        private readonly userService: import("@modules/user/application/services/IUserService").IUserService,
    ) {
        super(eventBus);
    }

    async handle(command: CreateUserCommand): Promise<boolean> {

        const user = await this.userService.createUser({
            name: command.name,
            email: command.email,
        });
        
        if (
            user &&
            typeof (user as any).emitCreatedEvent === "function" &&
            typeof (user as any).pullEvents === "function"
        ) {
            (user as any).emitCreatedEvent();        
            const events = user.pullEvents();
            
            for (const event of events) {
                await this.eventBus.publish(event);
            }
        }
        
        return !!user;
    }
}