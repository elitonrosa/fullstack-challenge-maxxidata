import { ApiProperty } from '@nestjs/swagger';

class PaginatedMeta {
  @ApiProperty()
  total: number;

  @ApiProperty()
  currentPage: number;

  @ApiProperty()
  lastPage: number;

  @ApiProperty()
  perPage: number;
}

export class PaginatedDto {
  @ApiProperty({ type: PaginatedMeta })
  meta: PaginatedMeta;
}
