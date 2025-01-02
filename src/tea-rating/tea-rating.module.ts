import { Module } from '@nestjs/common';
import { TeaRatingService } from './tea-rating.service';
import { TeasModule } from 'src/teas/teas.module';

@Module({
  imports: [TeasModule],
  providers: [TeaRatingService],
})
export class TeaRatingModule {}
