import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { AggregateRoot } from '@core/aggregates/AggregateRoot';
import { UserCreatedEvent } from '../events/user-created.event';

@Entity('users')
export class UserEntity extends AggregateRoot {
  @PrimaryGeneratedColumn('uuid')
  declare id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  createdAt: Date;
  
  @Column()
  updatedAt: Date;

  emitCreatedEvent(): void {
    this.addEvent(new UserCreatedEvent(this.id, this.name, this.email));
  }
}