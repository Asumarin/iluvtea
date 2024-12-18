import { Module } from '@nestjs/common';
import { TeasController } from './teas.controller';
import { TeasService } from './teas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tea } from './entities/tea.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tea])],
  controllers: [TeasController],
  providers: [TeasService],
})
export class TeasModule {}
