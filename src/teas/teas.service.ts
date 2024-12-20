import { Injectable, NotFoundException } from '@nestjs/common';
import { Tea } from './entities/tea.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeaDto } from './dto/create-tea.dto/create-tea.dto';
import { UpdateTeaDto } from './dto/update-tea.dto/update-tea.dto';

@Injectable()
export class TeasService {
  constructor(
    @InjectRepository(Tea)
    private readonly teaRepository: Repository<Tea>,
  ) {}

  findAll() {
    return this.teaRepository.find();
  }

  async findOne(id: number) {
    //  с гайда
    const tea = await this.teaRepository.findOneBy({ id });

    if (!tea?.id) {
      throw new NotFoundException(`Tea #${id} not found`);
    }

    return tea;
  }

  create(createTeaDto: CreateTeaDto) {
    const tea = this.teaRepository.create(createTeaDto);
    return this.teaRepository.save(tea);
  }

  async update(id: string, updateTeaDto: UpdateTeaDto) {
    const tea = await this.teaRepository.preload({
      id: +id,
      ...updateTeaDto,
    });
    if (!tea) {
      throw new NotFoundException(`Tea #${id} not found`);
    }
    return this.teaRepository.save(tea);
  }

  async remove(id) {
    const tea = await this.findOne(id);
    return this.teaRepository.remove(tea);
  }
}
