import { Module } from '@nestjs/common';
import { TeasController } from './teas.controller';
import { TeasService } from './teas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tea } from './entities/tea.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from 'src/events/entities/event.entity/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tea, Flavor, Event])],
  controllers: [TeasController],
  providers: [TeasService],
})
export class TeasModule {}
