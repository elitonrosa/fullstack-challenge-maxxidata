import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ProfessionalTypesService } from './professional-types.service';
import { CreateProfessionalTypeDto } from './dtos/create-professional-type.dto';
import { UpdateProfessionalTypeDto } from './dtos/update-professional-type.dto';
import { ProfessionalType } from './entities/professional-type.entity';
import { Paginated } from '../../types/pagination';
import { PaginationDto } from '../../dtos/pagination.dto';

@Controller('api/v1/professionals/types')
export class ProfessionalTypesController {
  constructor(private readonly professionalTypesService: ProfessionalTypesService) {}

  @Post()
  async create(@Body() body: CreateProfessionalTypeDto): Promise<ProfessionalType> {
    return this.professionalTypesService.create(body);
  }

  @Get()
  async findAll(@Query() pagination: PaginationDto): Promise<Paginated<ProfessionalType>> {
    return this.professionalTypesService.findAll(pagination);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ProfessionalType> {
    return this.professionalTypesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProfessionalTypeDto: UpdateProfessionalTypeDto,
  ): Promise<ProfessionalType> {
    return this.professionalTypesService.update(id, updateProfessionalTypeDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<ProfessionalType> {
    return this.professionalTypesService.remove(id);
  }
}
