import { Test, TestingModule } from '@nestjs/testing';
import { ProfessionalsService } from '../professionals.service';
import { Professional } from '../entities/professional.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  createMockRepository,
  createProfessionalMock,
  MockRepository,
  paginatedMock,
  professionalMock,
  updatedProfessionalMock,
  updateProfessionalMock,
} from './professionals.mock';
import { ProfessionalType } from '../../professional-types/entities/professional-type.entity';
import { NotFoundException } from '@nestjs/common';
import { Status } from '../../../common/enums/pagination.enum';
import { PaginationParamsDto } from '../../../common/dtos/pagination-params.dto';

describe('ProfessionalsService', () => {
  let service: ProfessionalsService;
  let professionalsRepository: MockRepository;
  let professionalTypesRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfessionalsService,
        {
          provide: getRepositoryToken(Professional),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(ProfessionalType),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<ProfessionalsService>(ProfessionalsService);
    professionalsRepository = module.get<MockRepository>(getRepositoryToken(Professional));
    professionalTypesRepository = module.get<MockRepository>(getRepositoryToken(ProfessionalType));
  });

  describe('create', () => {
    it('should return professional created', async () => {
      professionalTypesRepository.findOneOrFail.mockResolvedValueOnce(professionalMock.professionalType);

      const professional = await service.create(createProfessionalMock);

      expect(professional).toEqual(professionalMock);
    });

    it('should throw an error when professional type is invalid', async () => {
      professionalTypesRepository.findOneOrFail.mockRejectedValueOnce(new Error());

      try {
        await service.create(createProfessionalMock);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(
          `ProfessionalType with ID ${createProfessionalMock.professionalTypeId} is invalid`,
        );
      }
    });
  });

  describe('findOne', () => {
    it('should return a professional when an existing id is given', async () => {
      const professional = await service.findOne(1);

      expect(professional).toEqual(professionalMock);
    });

    it('should throw an error when an unexisting id is given', async () => {
      professionalsRepository.findOneOrFail.mockRejectedValueOnce(new Error());

      try {
        await service.findOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Professional with ID 999 not found`);
      }
    });
  });

  describe('findAll', () => {
    it('should return a list of professionals with default pagination', async () => {
      const professionals = await service.findAll({});

      expect(professionals).toEqual(paginatedMock);
    });

    it('should return a list of professionals with personalized pagination', async () => {
      professionalsRepository.findAndCount.mockResolvedValueOnce([paginatedMock.data, 2]);

      const pagination: PaginationParamsDto = { offset: 1, limit: 10, status: Status.ALL };

      const professionals = await service.findAll(pagination);

      expect(professionals).toEqual({ ...paginatedMock, meta: { ...paginatedMock.meta, perPage: 10 } });
    });

    it('should return a list of professional types with status true/false', async () => {
      professionalsRepository.findAndCount.mockResolvedValueOnce([paginatedMock.data, 2]);
      const professionals = await service.findAll({ status: Status.ALL });

      expect(professionals).toEqual({ ...paginatedMock, meta: { ...paginatedMock.meta, total: 2 } });
    });

    it('should limit pageSize to 500', async () => {
      professionalsRepository.findAndCount.mockResolvedValueOnce([[], 0]);
      const pagination: PaginationParamsDto = { limit: 999 };

      const professionals = await service.findAll(pagination);

      expect(professionals.meta.perPage).toEqual(500);
    });

    it('should set page size to 1 if 0 is given', async () => {
      professionalsRepository.findAndCount.mockResolvedValueOnce([[], 0]);
      const pagination: PaginationParamsDto = { limit: 0 };

      const professionals = await service.findAll(pagination);

      expect(professionals.meta.perPage).toEqual(1);
    });
  });

  describe('update', () => {
    it('should return a professional when an existing id is given', async () => {
      professionalTypesRepository.findOneOrFail.mockResolvedValueOnce(professionalMock.professionalType);
      professionalsRepository.preload.mockResolvedValue({ ...professionalMock, ...updateProfessionalMock });
      professionalsRepository.save.mockResolvedValue({ ...professionalMock, ...updateProfessionalMock });

      const professional = await service.update(1, updateProfessionalMock);

      expect(professional).toEqual({ ...professionalMock, ...updateProfessionalMock });
    });

    it('should throw an error when an unexisting id is given', async () => {
      professionalsRepository.findOneOrFail.mockRejectedValueOnce(new Error());

      try {
        await service.update(999, { name: 'João Neves' });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Professional with ID 999 not found`);
      }
    });

    it('should throw an error when professional type is invalid', async () => {
      professionalTypesRepository.findOneOrFail.mockRejectedValueOnce(new Error());

      try {
        await service.update(1, { professionalTypeId: 999 });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`ProfessionalType with ID 999 is invalid`);
      }
    });

    it('should update professional type when professional type id is given', async () => {
      professionalTypesRepository.findOneOrFail.mockResolvedValueOnce(professionalMock.professionalType);
      professionalsRepository.preload.mockResolvedValue(updatedProfessionalMock);
      professionalsRepository.save.mockResolvedValue(updatedProfessionalMock);

      const professional = await service.update(1, { professionalTypeId: 2 });

      expect(professional).toEqual(updatedProfessionalMock);
    });
  });

  describe('remove', () => {
    it('should return a deleted professional when an existing id is given', async () => {
      const professional = await service.remove(1);

      expect(professional).toEqual(professionalMock);
    });

    it('should throw an error when an unexisting id is given', async () => {
      professionalsRepository.findOneOrFail.mockRejectedValueOnce(new Error());

      try {
        await service.remove(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`Professional with ID 999 not found`);
      }
    });
  });
});
