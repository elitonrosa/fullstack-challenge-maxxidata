import { Module } from '@nestjs/common';
import { ProfessionalTypesService } from './professional-types.service';
import { ProfessionalTypesController } from './professional-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessionalType } from './entities/professional-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProfessionalType])],
  controllers: [ProfessionalTypesController],
  providers: [ProfessionalTypesService],
})
export class ProfessionalTypesModule {}
