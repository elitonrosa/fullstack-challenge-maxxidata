import { IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProfessionalTypeDto {
  @ApiProperty({
    description: 'Descrição do tipo de profissional',
    example: 'Médico',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Status do tipo de profissional (true = ativo, false = inativo)',
    example: true,
  })
  @IsBoolean()
  status: boolean;
}
