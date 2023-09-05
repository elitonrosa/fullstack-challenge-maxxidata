import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateProfessionalTypeDto } from './dtos/create-professional-type.dto';
import { UpdateProfessionalTypeDto } from './dtos/update-professional-type.dto';
import { ProfessionalType } from './entities/professional-type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from '../../dtos/pagination.dto';
import { Paginated } from '../../types/pagination';
import { OrderBy, OrderDirection, Status } from '../../enums/pagination.enum';

@Injectable()
export class ProfessionalTypesService {
  constructor(
    @InjectRepository(ProfessionalType)
    private readonly professionalTypeRepository: Repository<ProfessionalType>,
  ) {}

  async create(createProfessionalType: CreateProfessionalTypeDto): Promise<ProfessionalType> {
    return this.professionalTypeRepository.save(createProfessionalType);
  }

  async findAll(pagination: PaginationDto): Promise<Paginated<ProfessionalType>> {
    const {
      page = 1,
      pageSize = 10,
      order = OrderDirection.ASC,
      orderBy = OrderBy.ID,
      status = Status.ACTIVE,
    } = pagination;

    if (status === Status.ALL) {
      const [data, total] = await this.professionalTypeRepository.findAndCount({
        take: pageSize > 100 ? 100 : pageSize,
        skip: (page - 1) * pageSize,
        order: { [orderBy]: order },
      });

      const totalPages = Math.ceil(total / pageSize);

      return { data, total, pageSize, page, totalPages };
    } else {
      const [data, total] = await this.professionalTypeRepository.findAndCount({
        take: pageSize > 100 ? 100 : pageSize,
        skip: (page - 1) * pageSize,
        order: { [orderBy]: order },
        where: { status: status === Status.ACTIVE },
      });

      const totalPages = Math.ceil(total / pageSize);

      return { data, total, pageSize, page, totalPages };
    }
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
