import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Length, IsOptional } from 'class-validator';

export class FormExampleDto {
  @ApiProperty()
  id: number;

  @IsString({message: 'Nome inválido'})
  @Length(0, 60)
  @IsOptional()
  @ApiProperty()
  name: string;

  @ApiProperty()
  userCreate: number;

  @ApiProperty()
  dtCreate: Date;
}