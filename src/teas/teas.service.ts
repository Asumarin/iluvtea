import { Injectable, NotFoundException } from '@nestjs/common';
import { Tea } from './entities/tea.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeaDto } from './dto/create-tea.dto/create-tea.dto';
import { UpdateTeaDto } from './dto/update-tea.dto/update-tea.dto';
import { Flavor } from './entities/flavor.entity';

@Injectable()
export class TeasService {
  constructor(
    @InjectRepository(Tea)
    private readonly teaRepository: Repository<Tea>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
  ) {}

  findAll() {
    return this.teaRepository.find({
      relations: ['flavors'],
    });
  }

  async findOne(id: number) {
    const tea = await this.teaRepository.findOne({
      where: { id },
      relations: ['flavors'],
    });
    if (!tea?.id) {
      throw new NotFoundException(`Tea #${id} not found`);
    }
    return tea;
  }

  async create(createTeaDto: CreateTeaDto) {
    const flavors = await Promise.all(
      createTeaDto.flavors.map((name) => this.preloadFlavorByName(name)),
    );

    const tea = this.teaRepository.create({
      ...createTeaDto,
      flavors,
    });
    return this.teaRepository.save(tea);
  }

  async update(id: string, updateTeaDto: UpdateTeaDto) {
    const flavors =
      updateTeaDto.flavors &&
      (await Promise.all(
        updateTeaDto.flavors.map((name) => this.preloadFlavorByName(name)),
      ));

    const tea = await this.teaRepository.preload({
      id: +id,
      ...updateTeaDto,
      flavors,
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

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOne({
      where: { name },
    });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorRepository.create({ name });
  }
}
