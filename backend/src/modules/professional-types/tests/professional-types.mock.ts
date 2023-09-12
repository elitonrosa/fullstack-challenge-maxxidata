import { ProfessionalType } from '../entities/professional-type.entity';
import { CreateProfessionalTypeDto } from '../dtos/create-professional-type.dto';
import { UpdateProfessionalTypeDto } from '../dtos/update-professional-type.dto';
import { Repository } from 'typeorm';
import { ProfessionalTypePaginatedDto } from '../dtos/professional-type-paginated.dto';

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

export const defaultPaginatedMock: ProfessionalTypePaginatedDto = {
  data: [professionalTypeMock],
  meta: {
    total: 1,
    currentPage: 1,
    lastPage: 1,
    perPage: 50,
  },
};

export const personalizedPaginatedMock: ProfessionalTypePaginatedDto = {
  data: [],
  meta: {
    total: 1,
    currentPage: 1,
    lastPage: 1,
    perPage: 5,
  },
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
