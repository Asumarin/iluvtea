import { Module } from '@nestjs/common';
import { TeasController } from './teas.controller';
import { TeasService } from './teas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tea } from './entities/tea.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from 'src/events/entities/event.entity/event.entity';
import { ConfigModule } from '@nestjs/config';
import teasConfig from './config/teas.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tea, Flavor, Event]),
    ConfigModule.forFeature(teasConfig),
  ],
  controllers: [TeasController],
  providers: [TeasService],
  exports: [TeasService],
})
export class TeasModule {}
