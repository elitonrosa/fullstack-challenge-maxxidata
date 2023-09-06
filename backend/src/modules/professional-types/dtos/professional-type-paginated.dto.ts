import { PaginatedDto } from '../../../common/dtos/paginated.dto';
import { ProfessionalType } from '../entities/professional-type.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ProfessionalTypePaginatedDto extends PaginatedDto {
  @ApiProperty({ type: ProfessionalType, isArray: true })
  readonly data: ProfessionalType[];
}
