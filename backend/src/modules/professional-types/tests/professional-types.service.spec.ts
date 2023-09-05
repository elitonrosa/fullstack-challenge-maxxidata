import { Test, TestingModule } from '@nestjs/testing';
import { ProfessionalTypesService } from '../professional-types.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProfessionalType } from '../entities/professional-type.entity';
import {
  createMockRepository,
  createProfessionalTypeMock,
  defaultPaginatedMock,
  MockRepository,
  personalizedPaginatedMock,
  professionalTypeMock,
  updatedProfessionalTypeMock,
  updateProfessionalTypeMock,
} from './professional-types.mock';
import { NotFoundException } from '@nestjs/common';
import { PaginationDto } from '../../../dtos/pagination.dto';
import { OrderBy, OrderDirection, Status } from '../../../enums/pagination.enum';

describe('ProfessionalTypesService', () => {
  let service: ProfessionalTypesService;
  let repository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfessionalTypesService,
        {
          provide: getRepositoryToken(ProfessionalType),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<ProfessionalTypesService>(ProfessionalTypesService);
    repository = module.get<MockRepository>(getRepositoryToken(ProfessionalType));
  });

  describe('create', () => {
    it('should return professional type created', async () => {
      const professionalType = await service.create(createProfessionalTypeMock);

      expect(professionalType).toEqual(professionalTypeMock);
    });
  });

  describe('findOne', () => {
    it('should return a professional type when an existing id is given', async () => {
      const professionalType = await service.findOne(professionalTypeMock.id);

      expect(professionalType).toEqual(professionalTypeMock);
    });

    it('should throw an error when an unexisting id is given', async () => {
      repository.findOneOrFail.mockRejectedValueOnce(new Error());

      try {
        await service.findOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`ProfessionalType with ID 999 not found`);
      }
    });
  });

  describe('findAll', () => {
    it('should return a list of professional types with default pagination', async () => {
      const pagination: PaginationDto = {};
      const professionalTypes = await service.findAll(pagination);

      expect(professionalTypes).toEqual(defaultPaginatedMock);
    });

    it('should return a list of professional types with personalized pagination', async () => {
      repository.findAndCount.mockResolvedValue([[], 1]);
      const pagination: PaginationDto = {
        page: 2,
        pageSize: 5,
      };
      const professionalTypes = await service.findAll(pagination);

      expect(professionalTypes).toEqual(personalizedPaginatedMock);
    });

    it('should return a list of professional types with personalized order and orderBy', async () => {
      repository.findAndCount.mockResolvedValue([[], 1]);
      const pagination: PaginationDto = {
        page: 2,
        pageSize: 5,
        orderBy: OrderBy.STATUS,
        order: OrderDirection.DESC,
      };

      const professionalTypes = await service.findAll(pagination);

      expect(professionalTypes).toEqual(personalizedPaginatedMock);
    });

    it('should return a list of professional types with personalized status', async () => {
      repository.findAndCount.mockResolvedValue([[], 0]);
      const pagination: PaginationDto = {
        status: Status.INACTIVE,
      };

      const professionalTypes = await service.findAll(pagination);

      expect(professionalTypes).toEqual({
        data: [],
        total: 0,
        page: 1,
        pageSize: 10,
        totalPages: 0,
      });
    });
  });

  describe('remove', () => {
    it('should return professional type excluded when an existing ID is provided', async () => {
      const professionalType = await service.remove(professionalTypeMock.id);

      expect(professionalType).toEqual(professionalTypeMock);
    });

    it('should throw an error when an unexisting id is given', async () => {
      repository.findOneOrFail.mockRejectedValueOnce(new Error());

      try {
        await service.remove(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`ProfessionalType with ID 999 not found`);
      }
    });
  });

  describe('update', () => {
    it('should return professional type updated when an existing ID is provided', async () => {
      repository.preload.mockResolvedValue(updatedProfessionalTypeMock);
      repository.save.mockResolvedValue({
        ...professionalTypeMock,
        ...updateProfessionalTypeMock,
      });

      const professionalType = await service.update(2, updateProfessionalTypeMock);

      expect(professionalType).toEqual({
        ...professionalTypeMock,
        ...updateProfessionalTypeMock,
      });
    });

    it('should throw an error when an unexisting id is given', async () => {
      repository.findOneOrFail.mockRejectedValueOnce(new Error());

      try {
        await service.update(999, updateProfessionalTypeMock);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(`ProfessionalType with ID 999 not found`);
      }
    });
  });
});
