// infrastructure/services/UserService.ts
import { CreateUserRequestDto } from "@modules/user/application/dtos/request/CreateUserRequestDto";
import { IUserService } from "@modules/user/application/services/IUserService";
import * as IUserRepository from "@modules/user/application/repositories/IUserRepository";
import { UserEntity } from "@modules/user/domain/entities/UserEntity";
import { Injectable, Inject } from "@nestjs/common";
import { BadRequestException } from "@core/exception";

@Injectable()
export class UserService implements IUserService {
    constructor(
        @Inject(IUserRepository.USER_REPOSITORY_TOKEN)
        private readonly userRepository: IUserRepository.IUserRepository,
    ) {}

    async createUser(dto: CreateUserRequestDto): Promise<UserEntity | null> {
        try {
            const foundUser = await this.userRepository.findOne({ where: { email: dto.email } });
            if (foundUser) {
                throw new BadRequestException('User already exists', { email: dto.email });
            }
            const user = await this.userRepository.createUser(dto);
            return user; // Return entity để emit event
        } catch (error) {
            throw new BadRequestException(error.message, error.details);
        }
    }

    async findUserById(id: string): Promise<UserEntity | null> {
        return this.userRepository.findById(id);
    }
}