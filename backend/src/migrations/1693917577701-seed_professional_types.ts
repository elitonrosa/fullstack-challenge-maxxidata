import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedProfessionalTypes1693917577701 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO professional_types (description, status, created_at, updated_at)
        VALUES
          ('Desenvolvedor', true, NOW(), NOW()),
          ('Analista de Sistemas', true, NOW(), NOW()),
          ('Analista de Suporte', true, NOW(), NOW()),
          ('Médico', true, NOW(), NOW()),
          ('Enfermeiro', true, NOW(), NOW()),
          ('Fisioterapeuta', true, NOW(), NOW()),
          ('Nutricionista', true, NOW(), NOW()), 
          ('Psicólogo', true, NOW(), NOW()),
          ('Assistente Social', true, NOW(), NOW()),
          ('Fonoaudiólogo', true, NOW(), NOW()),
          ('Educador Físico', true, NOW(), NOW()),
          ('Farmacêutico', true, NOW(), NOW()),
          ('Biomédico', true, NOW(), NOW()),
          ('Bioquímico', true, NOW(), NOW()),
          ('Administrador', true, NOW(), NOW()),
          ('Contador', true, NOW(), NOW()),
          ('Advogado', true, NOW(), NOW()),
          ('Técnico de Informática', true, NOW(), NOW()),
          ('Auxiliar de Serviços Gerais', true, NOW(), NOW()),
          ('Motorista', true, NOW(), NOW());
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM professional_types;');
  }
}
