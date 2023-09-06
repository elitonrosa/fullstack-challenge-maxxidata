import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ProfessionalsService } from './professionals.service';
import { Professional } from './entities/professional.entity';
import { CreateProfessionalDto } from './dtos/create-professional.dto';
import { UpdateProfessionalDto } from './dtos/update-professional.dto';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { Paginated } from '../../common/types/pagination';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProfissionalPaginatedDto } from './dtos/profissional-paginated.dto';
import { NestErrorDefaultSwagger } from '../../helpers/swagger/nest-error-default.swagger';
import { NestBadRequestErrorSwagger } from '../../helpers/swagger/nest-bad-request-error.swagger';

@ApiTags('Profissionais')
@Controller('api/v1/professionals')
export class ProfessionalsController {
  constructor(private readonly professionalsService: ProfessionalsService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todos os profissionais' })
  @ApiResponse({
    status: 200,
    description: 'Lista de profissionais',
    type: ProfissionalPaginatedDto,
  })
  async findAll(@Query() pagination: PaginationDto): Promise<Paginated<Professional>> {
    return this.professionalsService.findAll(pagination);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um profissional pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Retorna o profissional com o ID informado',
    type: Professional,
  })
  @ApiResponse({
    status: 404,
    description: 'Profissional não encontrado',
    type: NestErrorDefaultSwagger,
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Professional> {
    return this.professionalsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Cria um profissional' })
  @ApiResponse({
    status: 201,
    description: 'Profissional criado com sucesso',
    type: Professional,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro de validação',
    type: NestBadRequestErrorSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Tipo de profissional não encontrado',
    type: NestErrorDefaultSwagger,
  })
  async create(@Body() body: CreateProfessionalDto): Promise<Professional> {
    return this.professionalsService.create(body);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um profissional' })
  @ApiResponse({
    status: 201,
    description: 'Profissional criado com sucesso',
    type: Professional,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro de validação',
    type: NestBadRequestErrorSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Tipo de profissional não encontrado',
    type: NestErrorDefaultSwagger,
  })
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateProfessionalDto): Promise<Professional> {
    return this.professionalsService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um profissional' })
  @ApiResponse({
    status: 200,
    description: 'Profissional removido com sucesso',
    type: Professional,
  })
  @ApiResponse({
    status: 404,
    description: 'Profissional não encontrado',
    type: NestErrorDefaultSwagger,
  })
  async deleteProfessional(@Param('id', ParseIntPipe) id: number): Promise<Professional> {
    return this.professionalsService.remove(id);
  }
}
