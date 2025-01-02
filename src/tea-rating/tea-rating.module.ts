import { Module } from '@nestjs/common';
import { TeaRatingService } from './tea-rating.service';
import { TeasModule } from 'src/teas/teas.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    DatabaseModule.register({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: 'pass123',
      port: 5432,
    }),
    TeasModule,
  ],
  providers: [TeaRatingService],
})
export class TeaRatingModule {}
