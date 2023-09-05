import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { OrderBy, OrderDirection, Status } from '../enums/pagination.enum';

export class PaginationDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  readonly page?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  readonly pageSize?: number;

  @IsOptional()
  @IsEnum(Status)
  readonly status?: Status;

  @IsOptional()
  @IsEnum(OrderDirection)
  readonly order?: OrderDirection;

  @IsOptional()
  @IsEnum(OrderBy)
  readonly orderBy?: OrderBy;
}
