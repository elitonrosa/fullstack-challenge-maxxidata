import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedProfessionals1693917952770 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(` 
        INSERT INTO public.professionals (name, phone, email, status, created_at, updated_at, professional_type_id)
        VALUES
          ('João Pedro Santos', '(11)99125-3068', 'joaopedro@email.com', true, NOW(), NOW(), 1),
          ('Maria da Silva', '(22)98765-4321', 'mariasilva@email.com', true, NOW(), NOW(), 2),
          ('Carlos Oliveira', '(33)12345-6789', 'carlosoliveira@email.com', true, NOW(), NOW(), 3),
          ('Ana Rodrigues', '(44)55555-5555', 'anarodrigues@email.com', true, NOW(), NOW(), 4),
          ('Fernanda Sousa', '(55)12345-6789', 'fernanda@email.com', true, NOW(), NOW(), 5),
          ('Ricardo Alves', '(66)98765-4321', 'ricardo@email.com', true, NOW(), NOW(), 6),
          ('Cristina Pereira', '(77)99999-9999', 'cristina@email.com', true, NOW(), NOW(), 7),
          ('Paulo Santos', '(88)77777-7777', 'paulo@email.com', true, NOW(), NOW(), 8),
          ('Lúcia Costa', '(99)88888-8888', 'lucia@email.com', true, NOW(), NOW(), 9),
          ('Pedro Fernandes', '(11)66666-6666', 'pedro@email.com', true, NOW(), NOW(), 10),
          ('Mariana Lima', '(22)55555-5555', 'mariana@email.com', true, NOW(), NOW(), 11),
          ('Roberto Almeida', '(33)44444-4444', 'roberto@email.com', true, NOW(), NOW(), 12),
          ('Sara Mendes', '(44)33333-3333', 'sara@email.com', true, NOW(), NOW(), 13),
          ('Lucas Oliveira', '(55)77777-7777', 'lucas@email.com', true, NOW(), NOW(), 14),
          ('Andréa Costa', '(66)22222-2222', 'andrea@email.com', true, NOW(), NOW(), 15),
          ('Rafael Fernandes', '(77)11111-1111', 'rafael@email.com', true, NOW(), NOW(), 16),
          ('Carla Santos', '(88)44444-4444', 'carla@email.com', true, NOW(), NOW(), 17),
          ('Gustavo Lima', '(99)33333-3333', 'gustavo@email.com', true, NOW(), NOW(), 18),
          ('Marta Alves', '(11)88888-8888', 'marta@email.com', true, NOW(), NOW(), 19),
          ('Eduardo Pereira', '(22)11111-1111', 'eduardo@email.com', true, NOW(), NOW(), 20);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM public.professionals;');
  }
}
