import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { Tea } from './entities/tea.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateTeaDto } from './dto/create-tea.dto/create-tea.dto';
import { UpdateTeaDto } from './dto/update-tea.dto/update-tea.dto';
import { Flavor } from './entities/flavor.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { Event } from 'src/events/entities/event.entity/event.entity';
import { ConfigType } from '@nestjs/config';
import teasConfig from './config/teas.config';
@Injectable()
export class TeasService {
  constructor(
    @InjectRepository(Tea)
    private readonly teaRepository: Repository<Tea>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    private readonly dataSource: DataSource,
    @Inject(teasConfig.KEY)
    private readonly teasConfiguration: ConfigType<typeof teasConfig>,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.teaRepository.find({
      relations: ['flavors'],
      skip: offset,
      take: limit,
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

  async recommendTea(tea: Tea) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      tea.recommendations++;

      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_tea';
      recommendEvent.type = 'tea';
      recommendEvent.payload = { teaId: tea.id };

      await queryRunner.manager.save(tea);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
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
