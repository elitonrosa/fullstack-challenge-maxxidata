import { PartialType } from '@nestjs/mapped-types';
import { CreateProfessionalTypeDto } from './create-professional-type.dto';

export class UpdateProfessionalTypeDto extends PartialType(CreateProfessionalTypeDto) {}
