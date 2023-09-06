import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { OrderBy, OrderDirection, Status } from '../enums/pagination.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationDto {
  @ApiPropertyOptional({
    description: 'Número da página',
    example: 1,
    default: 1,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  readonly page?: number;

  @ApiPropertyOptional({
    description: 'Quantidade de registros por página (mín = 1, max = 100)',
    default: 10,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  readonly pageSize?: number;

  @ApiPropertyOptional({
    description: 'Status do registro (true = ativo, false = inativo, all = todos os registros)',
    default: true,
    enum: ['true', 'false', 'all'],
  })
  @IsOptional()
  @IsEnum(Status)
  readonly status?: Status;

  @ApiPropertyOptional({
    description: 'Ordenação dos registros (ASC = Crescente, DESC = Decrescente)',
    default: 'ASC',
    enum: ['ASC', 'DESC'],
  })
  @IsOptional()
  @IsEnum(OrderDirection)
  readonly order?: OrderDirection;

  @ApiPropertyOptional({
    description: 'Campo para ordenação dos registros',
    default: 'id',
    enum: ['id', 'status', 'createdAt', 'updatedAt'],
  })
  @IsOptional()
  @IsEnum(OrderBy)
  readonly orderBy?: OrderBy;
}
