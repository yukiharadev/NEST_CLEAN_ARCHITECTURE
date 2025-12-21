import { Logger } from "@nestjs/common";
import { Exclude } from "class-transformer";

export abstract class AggregateRoot {
  @Exclude()
  private readonly domainEvents: any[] = [];

  protected addEvent(event: any): void {
    Logger.log(`Adding event: ${event}`, 'AggregateRoot');
    this.domainEvents.push(event);
  }

  pullEvents(): any[] {
    const events = [...this.domainEvents];
    this.domainEvents.length = 0;
    Logger.log(`Pulling events: ${JSON.stringify(events)}`, 'AggregateRoot');
    return events;
  }
}
