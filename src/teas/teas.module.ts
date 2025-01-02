import { Module, Scope } from '@nestjs/common';
import { TeasController } from './teas.controller';
import { TeasService } from './teas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tea } from './entities/tea.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from 'src/events/entities/event.entity/event.entity';
import { TEA_BRANDS } from './teas.constants';

@Module({
  imports: [TypeOrmModule.forFeature([Tea, Flavor, Event])],
  controllers: [TeasController],
  providers: [
    TeasService,
    {
      provide: TEA_BRANDS,
      useFactory: () => ['buddy brew', 'tess'],
      scope: Scope.TRANSIENT,
    },
  ],
  exports: [TeasService],
})
export class TeasModule {}
