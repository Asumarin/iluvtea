import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ManyteaController } from './manytea/manytea.controller';
import { TeasModule } from './teas/teas.module';

@Module({
  imports: [TeasModule],
  controllers: [AppController, ManyteaController],
  providers: [AppService],
})
export class AppModule {}
