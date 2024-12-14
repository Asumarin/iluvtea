import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeasController } from './teas/teas.controller';
import { ManyteaController } from './manytea/manytea.controller';
import { TeasService } from './teas/teas.service';

@Module({
  imports: [],
  controllers: [AppController, TeasController, ManyteaController],
  providers: [AppService, TeasService],
})
export class AppModule {}
