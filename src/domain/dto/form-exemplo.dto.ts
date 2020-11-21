import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Length, IsOptional } from 'class-validator';

export class FormExemploDto {
  @ApiProperty()
  id: number;

  @IsString({message: 'Nome inválido'})
  @Length(0, 60)
  @IsOptional()
  @ApiProperty()
  nome: string;

  @ApiProperty()
  usuarioCriacao: number;

  @ApiProperty()
  dtCriacao: Date;
}