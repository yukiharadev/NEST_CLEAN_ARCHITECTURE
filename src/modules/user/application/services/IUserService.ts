import { CreateUserRequestDto } from "../dtos/request/CreateUserRequestDto";
import { UserEntity } from "@modules/user/domain/entities/UserEntity";

export const USER_SERVICE_TOKEN = Symbol('IUserService');

export interface IUserService {
    createUser(dto: CreateUserRequestDto): Promise<UserEntity | null>;
    findUserById(id: string): Promise<UserEntity | null>;
}