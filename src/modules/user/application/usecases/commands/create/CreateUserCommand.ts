// application/usecases/commands/create-user.command.ts
import { ICommand } from "@core/cqrs/commands/ICommand";

export class CreateUserCommand implements ICommand<boolean> {
    constructor(
        public readonly name: string,
        public readonly email: string,
    ) {}
}