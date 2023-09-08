import { PaginatedDto } from '../../../common/dtos/paginated.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Professional } from '../entities/professional.entity';

export class ProfessionalPaginatedDto extends PaginatedDto {
  @ApiProperty({ type: Professional, isArray: true })
  readonly data: Professional[];
}
