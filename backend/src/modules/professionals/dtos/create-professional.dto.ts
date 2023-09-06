import { IsBoolean, IsEmail, IsInt, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProfessionalDto {
  @ApiProperty({
    description: 'Nome do Profissional',
    example: 'João da Silva',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'Telefone do Profissional',
    example: '(11)99999-9999',
  })
  @IsPhoneNumber('BR')
  @IsOptional()
  readonly phone?: string;

  @ApiProperty({
    description: 'Email do Profissional',
    example: 'joaosilva@email.com',
  })
  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @ApiProperty({
    description: 'ID do tipo de profissional',
    example: 1,
  })
  @IsInt()
  readonly professionalTypeId: number;

  @ApiProperty({
    description: 'Status do Profissional (true = ativo, false = inativo)',
    example: true,
  })
  @IsBoolean()
  readonly status: boolean;
}
