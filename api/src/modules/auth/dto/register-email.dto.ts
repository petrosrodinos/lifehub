// src/modules/auth/dto/register-email.dto.ts

import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterEmailDto {
    @ApiProperty({
        description: 'User email address',
        example: 'user@example.com',
        format: 'email'
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'User password (minimum 6 characters)',
        example: 'password123',
        minLength: 6
    })
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({
        description: 'User first name',
        example: 'John',
    })
    @IsString()
    @MinLength(2)
    first_name: string;

    @ApiProperty({
        description: 'User last name',
        example: 'Doe',
    })
    @IsString()
    @MinLength(2)
    last_name: string;

    @ApiProperty({
        description: 'User phone number',
        example: '1234567890',
    })
    @IsString()
    @MinLength(10)
    phone: string;

}
