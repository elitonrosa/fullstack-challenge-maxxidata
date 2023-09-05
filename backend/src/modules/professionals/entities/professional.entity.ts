import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProfessionalType } from '../../professional-types/entities/professional-type.entity';

@Entity('professionals')
export class Professional {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column('varchar', { length: 100 })
  readonly name: string;

  @Column('varchar', { length: 15, nullable: true })
  readonly phone: string;

  @Column('varchar', { length: 60, nullable: true })
  readonly email: string;

  @Column('boolean')
  readonly status: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  readonly createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  readonly updatedAt: Date;

  @ManyToOne(() => ProfessionalType, professionalType => professionalType, {
    eager: true,
  })
  @JoinColumn({ name: 'professional_type_id', referencedColumnName: 'id' })
  readonly professionalType?: ProfessionalType;
}
