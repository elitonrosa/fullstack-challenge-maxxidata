import { ProfessionalType } from '../entities/professional-type.entity';
import { CreateProfessionalTypeDto } from '../dtos/create-professional-type.dto';
import { UpdateProfessionalTypeDto } from '../dtos/update-professional-type.dto';
import { Paginated } from '../../../types/pagination';
import { Repository } from 'typeorm';

export type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

export const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOneOrFail: jest.fn().mockResolvedValue(professionalTypeMock),
  findAndCount: jest.fn().mockResolvedValue([[professionalTypeMock], 1]),
  findOne: jest.fn().mockResolvedValue(professionalTypeMock),
  remove: jest.fn().mockResolvedValue(professionalTypeMock),
  preload: jest.fn().mockResolvedValue(professionalTypeMock),
  save: jest.fn().mockResolvedValue(professionalTypeMock),
});

export const professionalTypeMock: ProfessionalType = {
  id: 1,
  description: 'Desenvolvedor',
  status: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const defaultPaginatedMock: Paginated<ProfessionalType> = {
  data: [professionalTypeMock],
  page: 1,
  pageSize: 10,
  total: 1,
  totalPages: 1,
};

export const personalizedPaginatedMock: Paginated<ProfessionalType> = {
  data: [],
  page: 2,
  pageSize: 5,
  total: 1,
  totalPages: 1,
};

export const updatedProfessionalTypeMock: ProfessionalType = {
  ...professionalTypeMock,
  description: 'Programador',
};

export const createProfessionalTypeMock: CreateProfessionalTypeDto = {
  description: 'Desenvolvedor',
  status: true,
};

export const updateProfessionalTypeMock: UpdateProfessionalTypeDto = {
  description: 'Programador',
  status: true,
};
