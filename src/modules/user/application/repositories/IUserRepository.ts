import { UserEntity } from "@modules/user/domain/entities/UserEntity";
import { CreateUserRequestDto } from "../dtos/request/CreateUserRequestDto";
import { IRepositoryService } from "@core/database/repositories/IRepositoryService";

export const USER_REPOSITORY_TOKEN = Symbol('IUserRepository');

export interface IUserRepository extends IRepositoryService<UserEntity, string> {
    createUser(dto: CreateUserRequestDto): Promise<UserEntity>;
    findAll(): Promise<UserEntity[]>;
}