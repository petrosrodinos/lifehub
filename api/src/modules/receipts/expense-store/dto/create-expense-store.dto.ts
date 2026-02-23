import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExpenseStoreDto {
    @ApiProperty({
        description: 'Store name',
        example: 'Lidl',
    })
    @IsString()
    @MinLength(1)
    name: string;
}
