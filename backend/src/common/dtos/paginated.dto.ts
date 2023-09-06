import { ApiProperty } from '@nestjs/swagger';

export class PaginatedDto {
  @ApiProperty()
  readonly total: number;

  @ApiProperty()
  readonly pageSize: number;

  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly totalPages: number;
}
