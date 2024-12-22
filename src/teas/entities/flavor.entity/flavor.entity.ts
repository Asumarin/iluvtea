import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tea } from '../tea.entity';
@Entity()
export class Flavor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany((type) => Tea, (tea) => tea.flavours)
  teas: Tea[];
}
