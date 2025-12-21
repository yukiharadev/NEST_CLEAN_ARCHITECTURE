import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserRequestDto {
    @ApiProperty({ description: 'User name', example: 'John Doe', maxLength: 100 })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @ApiProperty({ description: 'User email', example: 'john@example.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string;
}