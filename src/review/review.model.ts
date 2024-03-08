import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Review extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  rate: number;

  @ApiProperty()
  @Column()
  content: string;
}
