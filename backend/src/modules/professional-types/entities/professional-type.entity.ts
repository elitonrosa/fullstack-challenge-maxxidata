import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('professional_types')
export class ProfessionalType {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ApiProperty()
  @Column('varchar')
  readonly description: string;

  @ApiProperty()
  @Column('boolean')
  readonly status: boolean;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  readonly createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  readonly updatedAt: Date;
}
