import { IsBoolean, IsEmail, IsInt, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class CreateProfessionalDto {
  @IsString()
  readonly name: string;

  @IsPhoneNumber('BR')
  @IsOptional()
  readonly phone?: string;

  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @IsInt()
  readonly professionalTypeId: number;

  @IsBoolean()
  readonly status: boolean;
}
