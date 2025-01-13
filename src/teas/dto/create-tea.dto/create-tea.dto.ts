import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateTeaDto {
  @ApiProperty({ description: 'The name of a tea.' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The brand of a tea.' })
  @IsString()
  readonly brand: string;

  @ApiProperty({ example: [] })
  @IsString({ each: true })
  readonly flavors: string[];
}
