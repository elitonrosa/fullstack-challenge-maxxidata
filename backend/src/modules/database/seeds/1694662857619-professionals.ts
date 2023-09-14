import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Professional } from '../../professionals/entities/professional.entity';

export default class Professionals1694662857619 implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const repository = dataSource.getRepository(Professional);

    await repository.insert([
      {
        name: 'João Pedro Santos',
        phone: '(11) 99125-3068',
        email: 'joaopedro@email.com',
        status: true,
        professionalType: { id: 1 },
      },
      {
        name: 'Maria da Silva',
        phone: '(22) 98765-4321',
        email: 'mariasilva@email.com',
        status: true,
        professionalType: { id: 2 },
      },
      {
        name: 'Carlos Oliveira',
        phone: '(33) 12345-6789',
        email: 'carlosoliveira@email.com',
        status: true,
        professionalType: { id: 3 },
      },
      {
        name: 'Ana Rodrigues',
        phone: '(44) 55555-5555',
        email: 'anarodrigues@email.com',
        status: true,
        professionalType: { id: 4 },
      },
      {
        name: 'Fernanda Sousa',
        phone: '(55) 12345-6789',
        email: 'fernanda@email.com',
        status: true,
        professionalType: { id: 5 },
      },
      {
        name: 'Ricardo Alves',
        phone: '(66) 98765-4321',
        email: 'ricardo@email.com',
        status: true,
        professionalType: { id: 6 },
      },
      {
        name: 'Cristina Pereira',
        phone: '(77) 99999-9999',
        email: 'cristina@email.com',
        status: true,
        professionalType: { id: 7 },
      },
      {
        name: 'Paulo Santos',
        phone: '(88) 77777-7777',
        email: 'paulo@email.com',
        status: true,
        professionalType: { id: 8 },
      },
      {
        name: 'Lúcia Costa',
        phone: '(99) 88888-8888',
        email: 'lucia@email.com',
        status: true,
        professionalType: { id: 9 },
      },
      {
        name: 'Pedro Fernandes',
        phone: '(11) 66666-6666',
        email: 'pedro@email.com',
        status: true,
        professionalType: { id: 10 },
      },
      {
        name: 'Mariana Lima',
        phone: '(22) 55555-5555',
        email: 'mariana@email.com',
        status: true,
        professionalType: { id: 11 },
      },
      {
        name: 'Roberto Almeida',
        phone: '(33) 44444-4444',
        email: 'roberto@email.com',
        status: true,
        professionalType: { id: 12 },
      },
      {
        name: 'Sara Mendes',
        phone: '(44) 33333-3333',
        email: 'sara@email.com',
        status: true,
        professionalType: { id: 13 },
      },
      {
        name: 'Lucas Oliveira',
        phone: '(55) 77777-7777',
        email: 'lucas@email.com',
        status: true,
        professionalType: { id: 14 },
      },
      {
        name: 'Andréa Costa',
        phone: '(66) 22222-2222',
        email: 'andrea@email.com',
        status: true,
        professionalType: { id: 15 },
      },
      {
        name: 'Rafael Fernandes',
        phone: '(77) 11111-1111',
        email: 'rafael@email.com',
        status: true,
        professionalType: { id: 16 },
      },
      {
        name: 'Carla Santos',
        phone: '(88) 44444-4444',
        email: 'carla@email.com',
        status: true,
        professionalType: { id: 17 },
      },
      {
        name: 'Gustavo Lima',
        phone: '(99) 33333-3333',
        email: 'gustavo@email.com',
        status: true,
        professionalType: { id: 18 },
      },
      {
        name: 'Marta Alves',
        phone: '(11) 88888-8888',
        email: 'marta@email.com',
        status: true,
        professionalType: { id: 19 },
      },
      {
        name: 'Eduardo Pereira',
        phone: '(22) 11111-1111',
        email: 'eduardo@email.com',
        status: true,
        professionalType: { id: 20 },
      },
    ]);
  }
}
