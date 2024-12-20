import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Tea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column('json', { nullable: true })
  flavours: string[];
}
