import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableProfessionalTypes1693842606646 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS public.professional_types
      (
          id SERIAL PRIMARY KEY,
          description VARCHAR NOT NULL,
          status BOOLEAN NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS public.professional_types;');
  }
}
