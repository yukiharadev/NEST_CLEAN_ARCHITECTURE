import { Injectable, Logger, Inject } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { QueryHandlerBase } from '@core/cqrs/handlers/QueryHandlerBase';
import { GetAllUsersQuery } from './GetAllUsersQuery';
import { type IUserRepository, USER_REPOSITORY_TOKEN } from '@modules/user/application/repositories/IUserRepository';
import { UserMapper } from '@modules/user/application/mappers/UserMapper';
import { UserResponseDto } from '@modules/user/application/dtos/response/UserResponseDto';

@QueryHandler(GetAllUsersQuery)
@Injectable()
export class GetAllUsersQueryHandler extends QueryHandlerBase<GetAllUsersQuery, UserResponseDto[]> {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
    private readonly userMapper: UserMapper,
  ) {
    super();
  }

  async handle(query: GetAllUsersQuery): Promise<UserResponseDto[]> {


    try {
      const users = await this.userRepository.findAll();
      
      Logger.log(
        `[GetAllUsersQueryHandler] Found ${users.length} users`,
        'GetAllUsersQueryHandler',
      );

      return this.userMapper.toResponseDtoArray(users);
    } catch (error) {
      Logger.error(
        `[GetAllUsersQueryHandler] Error fetching users: ${error.message}`,
        'GetAllUsersQueryHandler',
      );
      throw error;
    }
  }
}
