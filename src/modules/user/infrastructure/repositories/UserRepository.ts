// infrastructure/repositories/UserRepository.ts
import { CreateUserRequestDto } from "@modules/user/application/dtos/request/CreateUserRequestDto";
import { UserEntity } from "@modules/user/domain/entities/UserEntity";
import { IUserRepository } from "@modules/user/application/repositories/IUserRepository";
import { RepositoryService } from "@core/database/repositories/RepositoryService";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EventBus } from "@nestjs/cqrs";

@Injectable()
export class UserRepository extends RepositoryService<UserEntity, string> implements IUserRepository {
    constructor(
        @InjectRepository(UserEntity)
        repository: Repository<UserEntity>,
        private readonly eventBus: EventBus,
    ) {
        super(repository);
    }

    async createUser(dto: CreateUserRequestDto): Promise<UserEntity> {
        // Tạo entity instance
        const user = new UserEntity();
        user.name = dto.name;
        user.email = dto.email;
        user.createdAt = new Date();
        user.updatedAt = new Date();
        
        // Save entity (TypeORM sẽ tự generate ID)
        const savedUser = await this.repository.save(user);
        
        // Emit domain event sau khi có ID
        savedUser.emitCreatedEvent();
        
        // Publish domain events (sẵn sàng để handlers xử lý sau)
        const events = savedUser.pullEvents();
        for (const event of events) {
            await this.eventBus.publish(event);
        }
        
        return savedUser;
    }

    async findAll(): Promise<UserEntity[]> {
        return this.repository.find();
    }
}