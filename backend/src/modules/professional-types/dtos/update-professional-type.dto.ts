import { PartialType } from '@nestjs/swagger';
import { CreateProfessionalTypeDto } from './create-professional-type.dto';

export class UpdateProfessionalTypeDto extends PartialType(CreateProfessionalTypeDto) {}
