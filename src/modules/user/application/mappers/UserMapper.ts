import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UserEntity } from '@modules/user/domain/entities/UserEntity';
import { UserResponseDto } from '../dtos/response/UserResponseDto';

@Injectable()
export class UserMapper {
  toResponseDto(entity: UserEntity): UserResponseDto {
    return plainToClass(UserResponseDto, entity, {
      excludeExtraneousValues: true,
    });
  }

  toResponseDtoArray(entities: UserEntity[]): UserResponseDto[] {
    return entities
      .map((entity) => {
        try {
          const dto = this.toResponseDto(entity);
          if (dto instanceof UserResponseDto) {
            return dto;
          }
          return null;
        } catch {
          return null;
        }
      })
      .filter((dto): dto is UserResponseDto => dto !== null);
  }
}
