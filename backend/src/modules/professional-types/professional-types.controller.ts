import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ProfessionalTypesService } from './professional-types.service';
import { CreateProfessionalTypeDto } from './dtos/create-professional-type.dto';
import { UpdateProfessionalTypeDto } from './dtos/update-professional-type.dto';
import { ProfessionalType } from './entities/professional-type.entity';
import { PaginationParamsDto } from '../../common/dtos/pagination-params.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProfessionalTypePaginatedDto } from './dtos/professional-type-paginated.dto';
import { NestBadRequestErrorSwagger } from '../../helpers/swagger/nest-bad-request-error.swagger';
import { NestErrorDefaultSwagger } from '../../helpers/swagger/nest-error-default.swagger';

@ApiTags('Tipos de Profissionais')
@Controller('api/v1/professionals/types')
export class ProfessionalTypesController {
  constructor(private readonly professionalTypesService: ProfessionalTypesService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um tipo de profissional' })
  @ApiResponse({
    status: 201,
    description: 'Tipo de profissional criado',
    type: ProfessionalType,
  })
  @ApiResponse({
    status: 400,
    description: 'Erro de validação',
    type: NestBadRequestErrorSwagger,
  })
  async create(@Body() body: CreateProfessionalTypeDto): Promise<ProfessionalType> {
    return this.professionalTypesService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os tipos de profissionais' })
  @ApiResponse({
    status: 200,
    description: 'Lista de tipos de profissionais',
    type: ProfessionalTypePaginatedDto,
  })
  async findAll(@Query() pagination: PaginationParamsDto): Promise<ProfessionalTypePaginatedDto> {
    return this.professionalTypesService.findAll(pagination);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um tipo de profissional pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Retorna o tipo de profissional com o ID informado',
    type: ProfessionalType,
  })
  @ApiResponse({
    status: 404,
    description: 'Tipo de profissional não encontrado',
    type: NestErrorDefaultSwagger,
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ProfessionalType> {
    return this.professionalTypesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um tipo de profissional' })
  @ApiResponse({
    status: 200,
    description: 'Tipo de profissional atualizado',
    type: ProfessionalType,
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
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProfessionalTypeDto: UpdateProfessionalTypeDto,
  ): Promise<ProfessionalType> {
    return this.professionalTypesService.update(id, updateProfessionalTypeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um tipo de profissional' })
  @ApiResponse({
    status: 200,
    description: 'Tipo de profissional removido',
    type: ProfessionalType,
  })
  @ApiResponse({
    status: 404,
    description: 'Tipo de profissional não encontrado',
    type: NestErrorDefaultSwagger,
  })
  @ApiResponse({
    status: 422,
    description: 'Não é possível remover um tipo de profissional com profissionais associados',
    type: NestErrorDefaultSwagger,
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<ProfessionalType> {
    return this.professionalTypesService.remove(id);
  }
}
