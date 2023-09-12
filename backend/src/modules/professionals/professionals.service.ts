import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Professional } from './entities/professional.entity';
import { Repository } from 'typeorm';
import { CreateProfessionalDto } from './dtos/create-professional.dto';
import { UpdateProfessionalDto } from './dtos/update-professional.dto';
import { OrderBy, OrderDirection, Status } from '../../common/enums/pagination.enum';
import { ProfessionalType } from '../professional-types/entities/professional-type.entity';
import { PaginationParamsDto } from '../../common/dtos/pagination-params.dto';
import { ProfessionalPaginatedDto } from './dtos/professional-paginated.dto';

@Injectable()
export class ProfessionalsService {
  constructor(
    @InjectRepository(Professional)
    private readonly professionalRepository: Repository<Professional>,
    @InjectRepository(ProfessionalType)
    private readonly professionalTypeRepository: Repository<ProfessionalType>,
  ) {}

  async create(createProfessional: CreateProfessionalDto): Promise<Professional> {
    const { professionalTypeId, ...newProfessional } = createProfessional;

    try {
      await this.professionalTypeRepository.findOneOrFail({
        where: { id: professionalTypeId },
      });

      return await this.professionalRepository.save({
        ...newProfessional,
        professionalType: { id: professionalTypeId },
      });
    } catch (error) {
      throw new NotFoundException(`ProfessionalType with ID ${professionalTypeId} is invalid`);
    }
  }

  async findAll(pagination: PaginationParamsDto): Promise<ProfessionalPaginatedDto> {
    const {
      limit = 50,
      offset = 0,
      orderBy = OrderBy.ID,
      order = OrderDirection.ASC,
      status = Status.ALL,
    } = pagination;

    const options = {
      order: { [orderBy]: order === OrderDirection.ASC ? OrderDirection.ASC : OrderDirection.DESC },
      take: Math.min(Math.max(limit, 1), 500),
      skip: offset,
    };

    const [professionals, total] = await this.professionalRepository.findAndCount(
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

  async findOne(id: number): Promise<Professional> {
    try {
      return await this.professionalRepository.findOneOrFail({
        where: { id: +id },
      });
    } catch {
      throw new NotFoundException(`Professional with ID ${id} not found`);
    }
  }

  async update(id: number, updateProfessional: UpdateProfessionalDto): Promise<Professional> {
    const professional = await this.findOne(id);

    if (Object.keys(updateProfessional).includes('professionalTypeId')) {
      const { professionalTypeId, ...newProfessional } = updateProfessional;

      try {
        await this.professionalTypeRepository.findOneOrFail({
          where: { id: professionalTypeId },
        });
      } catch (error) {
        throw new NotFoundException(`ProfessionalType with ID ${professionalTypeId} is invalid`);
      }

      const updated = await this.professionalRepository.preload({
        ...professional,
        ...newProfessional,
        professionalType: { id: professionalTypeId },
      });

      return this.professionalRepository.save(updated);
    } else {
      const updated = await this.professionalRepository.preload({
        ...professional,
        ...updateProfessional,
      });

      return this.professionalRepository.save(updated);
    }
  }

  async remove(id: number): Promise<Professional> {
    const professional = await this.findOne(id);

    return this.professionalRepository.remove(professional);
  }
}
