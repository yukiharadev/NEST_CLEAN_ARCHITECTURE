import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ description: 'User ID', example: 'a3f2b7c1-1234-4d5e-9abc-ef0123456789' })
  @Expose()
  id: string;

  @ApiProperty({ description: 'User name', example: 'John Doe' })
  @Expose()
  name: string;

  @ApiProperty({ description: 'User email', example: 'john@example.com' })
  @Expose()
  email: string;

  @ApiProperty({ description: 'Created timestamp', example: '2025-12-22T00:00:00.000Z' })
  @Expose()
  createdAt: Date;

  @ApiProperty({ description: 'Updated timestamp', example: '2025-12-22T00:10:00.000Z' })
  @Expose()
  updatedAt: Date;
}

export interface IUserResponseDto {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}