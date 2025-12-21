import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserEntity } from './domain/entities/UserEntity';
import { CreateUserHandler } from './application/usecases/commands/create/CreateUserCommandHandler';
import { GetAllUsersQueryHandler } from './application/usecases/queries/get-all/GetAllUsersQueryHandler';
import { GetPagedUsersQueryHandler } from './application/usecases/queries/get-page/GetPagedUsersQueryHandler';
import { UserCreatedHandler } from './application/usecases/events/UserCreatedHandler';
import { UserService } from './infrastructure/services/UserService';
import { USER_SERVICE_TOKEN } from './application/services/IUserService';
import { UserRepository } from './infrastructure/repositories/UserRepository';
import { USER_REPOSITORY_TOKEN } from './application/repositories/IUserRepository';
import { UserMapper } from './application/mappers/UserMapper';

@Module({
    imports: [CqrsModule, TypeOrmModule.forFeature([UserEntity])],
    controllers: [UserController],
    providers: [
        CreateUserHandler,
        GetAllUsersQueryHandler,
        GetPagedUsersQueryHandler,
        UserCreatedHandler, 
        UserCreatedHandler,
        UserMapper,
        {
            provide: USER_SERVICE_TOKEN,
            useClass: UserService,
        },        
        {
            provide: USER_REPOSITORY_TOKEN,
            useClass: UserRepository,
        },
    ],
})
export class UserModule { }