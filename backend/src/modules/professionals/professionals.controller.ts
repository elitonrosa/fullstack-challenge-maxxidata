import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ProfessionalsService } from './professionals.service';
import { Professional } from './entities/professional.entity';
import { CreateProfessionalDto } from './dtos/create-professional.dto';
import { UpdateProfessionalDto } from './dtos/update-professional.dto';
import { PaginationDto } from '../../dtos/pagination.dto';
import { Paginated } from '../../types/pagination';

@Controller('api/v1/professionals')
export class ProfessionalsController {
  constructor(private readonly professionalsService: ProfessionalsService) {}

  @Get()
  async findAll(@Query() pagination: PaginationDto): Promise<Paginated<Professional>> {
    return this.professionalsService.findAll(pagination);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Professional> {
    return this.professionalsService.findOne(id);
  }

  @Post()
  async create(@Body() body: CreateProfessionalDto): Promise<Professional> {
    return this.professionalsService.create(body);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateProfessionalDto): Promise<Professional> {
    return this.professionalsService.update(id, body);
  }

  @Delete(':id')
  async deleteProfessional(@Param('id', ParseIntPipe) id: number): Promise<Professional> {
    return this.professionalsService.remove(id);
  }
}
