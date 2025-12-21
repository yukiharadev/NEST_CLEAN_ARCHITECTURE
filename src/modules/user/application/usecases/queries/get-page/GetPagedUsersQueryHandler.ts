import { Injectable, Inject, Logger } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { QueryHandlerBase } from '@core/cqrs/handlers/QueryHandlerBase';
import { GetPagedUsersQuery } from './GetPagedUsersQuery';
import { USER_REPOSITORY_TOKEN, type IUserRepository } from '@modules/user/application/repositories/IUserRepository';
import { UserMapper } from '@modules/user/application/mappers/UserMapper';
import { UserResponseDto } from '@modules/user/application/dtos/response/UserResponseDto';
import { PaginatedResult } from '@core/database/repositories/IRepositoryService';

@QueryHandler(GetPagedUsersQuery)
@Injectable()
export class GetPagedUsersQueryHandler extends QueryHandlerBase<GetPagedUsersQuery, PaginatedResult<UserResponseDto>> {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
    private readonly userMapper: UserMapper,
  ) {
    super();
  }

  async handle(query: GetPagedUsersQuery): Promise<PaginatedResult<UserResponseDto>> {
    const { pageIndex, pageSize } = query;
    Logger.log(
      `📄 [GetPagedUsersQueryHandler] pageIndex=${pageIndex}, pageSize=${pageSize}`,
      'GetPagedUsersQueryHandler',
    );

    const result = await this.userRepository.findPaginated(
      { pageIndex, pageSize },
      { order: { createdAt: 'DESC' } },
    );

    return {
      ...result,
      result: this.userMapper.toResponseDtoArray(result.result),
    };
  }
}
