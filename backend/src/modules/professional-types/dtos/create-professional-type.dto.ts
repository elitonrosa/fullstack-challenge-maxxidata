import { IsBoolean, IsString } from 'class-validator';

export class CreateProfessionalTypeDto {
  @IsString()
  description: string;

  @IsBoolean()
  status: boolean;
}
