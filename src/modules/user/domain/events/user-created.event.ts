import { DomainEvent } from "@core/aggregates/DomainEvent";

export class UserCreatedEvent extends DomainEvent {
    constructor(
        public readonly userId: string,
        public readonly userName: string,
        public readonly userEmail: string,
    ) {
        super();
    }
}

