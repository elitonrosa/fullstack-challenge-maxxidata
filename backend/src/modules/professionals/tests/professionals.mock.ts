import { Repository } from 'typeorm';
import { Professional } from '../entities/professional.entity';
import { CreateProfessionalDto } from '../dtos/create-professional.dto';
import { UpdateProfessionalDto } from '../dtos/update-professional.dto';

export type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

export const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOneOrFail: jest.fn().mockResolvedValue(professionalMock),
  save: jest.fn().mockResolvedValue(professionalMock),
  findAndCount: jest.fn().mockResolvedValue([[professionalMock, { ...professionalMock, id: 2 }], 2]),
  preload: jest.fn().mockResolvedValue(professionalMock),
  remove: jest.fn().mockResolvedValue(professionalMock),
});

export const professionalMock: Professional = {
  id: 1,
  name: 'João Neves',
  email: 'joaoneves@email.com',
  phone: '(11)99999-9999',
  status: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  professionalType: {
    id: 1,
    description: 'Desenvolvedor',
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

export const updatedProfessionalMock: Professional = {
  ...professionalMock,
  name: 'João Neves',
  professionalType: {
    id: 2,
    description: 'Programador',
    status: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

export const createProfessionalMock: CreateProfessionalDto = {
  name: 'João Neves',
  email: 'joaoneves@email.com',
  phone: '(11)99999-9999',
  professionalTypeId: 1,
  status: true,
};

export const updateProfessionalMock: UpdateProfessionalDto = {
  name: 'João Neves dos Santos',
};

export const paginatedMock = {
  data: [professionalMock, { ...professionalMock, id: 2 }],
  page: 1,
  pageSize: 10,
  total: 2,
  totalPages: 1,
};
