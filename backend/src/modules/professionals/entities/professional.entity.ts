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
import { ApiProperty } from '@nestjs/swagger';

@Entity('professionals')
export class Professional {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ApiProperty()
  @Column('varchar', { length: 100 })
  readonly name: string;

  @ApiProperty()
  @Column('varchar', { length: 15, nullable: true })
  readonly phone: string;

  @ApiProperty()
  @Column('varchar', { length: 60, nullable: true })
  readonly email: string;

  @ApiProperty()
  @Column('boolean')
  readonly status: boolean;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  readonly createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  readonly updatedAt: Date;

  @ApiProperty({
    type: ProfessionalType,
  })
  @ManyToOne(() => ProfessionalType, professionalType => professionalType, {
    eager: true,
  })
  @JoinColumn({ name: 'professional_type_id', referencedColumnName: 'id' })
  readonly professionalType?: ProfessionalType;
}
