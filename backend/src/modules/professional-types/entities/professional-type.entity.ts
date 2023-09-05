import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('professional_types')
export class ProfessionalType {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column('varchar')
  readonly description: string;

  @Column('boolean')
  readonly status: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  readonly updatedAt: Date;
}
