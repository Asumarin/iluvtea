import { Column, Entity, PrimaryColumn } from 'typeorm';
@Entity()
export class Tea {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column('json', { nullable: true })
  flavours: string[];
}
