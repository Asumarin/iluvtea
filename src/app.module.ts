import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeasController } from './teas/teas.controller';
import { ManyteaController } from './manytea/manytea.controller';

@Module({
  imports: [],
  controllers: [AppController, TeasController, ManyteaController],
  providers: [AppService],
})
export class AppModule {}
