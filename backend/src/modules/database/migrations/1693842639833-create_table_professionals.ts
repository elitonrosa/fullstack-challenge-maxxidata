import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableProfessionals1693842639833 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS public.professionals
      (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          phone VARCHAR(15),
          email VARCHAR(60),
          status BOOLEAN NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
          professional_type_id INT NOT NULL,
          foreign key (professional_type_id) references public.professional_types(id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS public.professionals;');
  }
}
