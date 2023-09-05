import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Professional } from './entities/professional.entity';
import { Repository } from 'typeorm';
import { CreateProfessionalDto } from './dtos/create-professional.dto';
import { UpdateProfessionalDto } from './dtos/update-professional.dto';
import { PaginationDto } from '../../dtos/pagination.dto';
import { Paginated } from '../../types/pagination';
import { OrderBy, OrderDirection, Status } from '../../enums/pagination.enum';
import { ProfessionalType } from '../professional-types/entities/professional-type.entity';

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

  async findAll(pagination: PaginationDto): Promise<Paginated<Professional>> {
    const {
      page = 1,
      pageSize = 10,
      order = OrderDirection.ASC,
      orderBy = OrderBy.ID,
      status = Status.ACTIVE,
    } = pagination;

    if (status === Status.ALL) {
      const [data, total] = await this.professionalRepository.findAndCount({
        take: pageSize > 100 ? 100 : pageSize,
        skip: (page - 1) * pageSize,
        order: { [orderBy]: order },
      });

      const totalPages = Math.ceil(total / pageSize);

      return { data, total, pageSize, page, totalPages };
    } else {
      const [data, total] = await this.professionalRepository.findAndCount({
        take: pageSize > 100 ? 100 : pageSize,
        skip: (page - 1) * pageSize,
        order: { [orderBy]: order },
        where: { status: status === Status.ACTIVE },
      });

      const totalPages = Math.ceil(total / pageSize);

      return { data, total, pageSize, page, totalPages };
    }
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
      const updated = await this.professionalRepository.preload({ ...professional, ...updateProfessional });

      return this.professionalRepository.save(updated);
    }
  }

  async remove(id: number): Promise<Professional> {
    const professional = await this.findOne(id);

    return this.professionalRepository.remove(professional);
  }
}
