import { Module } from '@nestjs/common';
import { ProfessionalTypesModule } from './modules/professional-types/professional-types.module';
import { ProfessionalsModule } from './modules/professionals/professionals.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [DatabaseModule, ProfessionalTypesModule, ProfessionalsModule],
})
export class AppModule {}
