import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateProfessionalTypeDto } from './dtos/create-professional-type.dto';
import { UpdateProfessionalTypeDto } from './dtos/update-professional-type.dto';
import { ProfessionalType } from './entities/professional-type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationParamsDto } from '../../common/dtos/pagination-params.dto';
import { OrderBy, OrderDirection, Status } from '../../common/enums/pagination.enum';
import { ProfessionalTypePaginatedDto } from './dtos/professional-type-paginated.dto';

@Injectable()
export class ProfessionalTypesService {
  constructor(
    @InjectRepository(ProfessionalType)
    private readonly professionalTypeRepository: Repository<ProfessionalType>,
  ) {}

  async create(createProfessionalType: CreateProfessionalTypeDto): Promise<ProfessionalType> {
    return this.professionalTypeRepository.save(createProfessionalType);
  }

  async findAll(pagination: PaginationParamsDto): Promise<ProfessionalTypePaginatedDto> {
    const {
      offset = 0,
      orderBy = OrderBy.ID,
      order = OrderDirection.ASC,
      status = Status.ALL,
      limit = 50,
    } = pagination;

    const options = {
      order: { [orderBy]: order === OrderDirection.ASC ? OrderDirection.ASC : OrderDirection.DESC },
      take: Math.min(Math.max(limit, 1), 500),
      skip: offset,
    };

    const [professionals, total] = await this.professionalTypeRepository.findAndCount(
      status === Status.ALL ? options : { ...options, where: { status: status === Status.ACTIVE } },
    );

    return {
      data: professionals,
      meta: {
        total,
        currentPage: Math.floor(offset / limit) + 1,
        lastPage: Math.ceil(total / limit) < 1 ? 1 : Math.ceil(total / limit),
        perPage: Math.min(Math.max(limit, 1), 500),
      },
    };
  }

  async findOne(id: number): Promise<ProfessionalType> {
    try {
      return await this.professionalTypeRepository.findOneOrFail({
        where: { id: +id },
      });
    } catch {
      throw new NotFoundException(`ProfessionalType with ID ${id} not found`);
    }
  }

  async update(id: number, updateProfessionalType: UpdateProfessionalTypeDto): Promise<ProfessionalType> {
    const professionalType = await this.findOne(id);

    const updated = await this.professionalTypeRepository.preload({
      ...professionalType,
      ...updateProfessionalType,
    });

    return this.professionalTypeRepository.save(updated);
  }

  async remove(id: number): Promise<ProfessionalType> {
    const professionalType = await this.findOne(id);

    try {
      return await this.professionalTypeRepository.remove(professionalType);
    } catch {
      throw new UnprocessableEntityException(`ProfessionalType with ID ${id} cannot be removed`);
    }
  }
}
