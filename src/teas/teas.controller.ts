import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TeasService } from './teas.service';
import { CreateTeaDto } from './dto/create-tea.dto/create-tea.dto';
import { UpdateTeaDto } from './dto/update-tea.dto/update-tea.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { REQUEST } from '@nestjs/core';

@Controller('teas')
export class TeasController {
  constructor(
    private readonly teasService: TeasService,
    @Inject(REQUEST) private readonly request: Request,
  ) {
    console.log('TeasController created!');
  }

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    //const { limit, offset } = paginationQuery;
    return this.teasService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id) {
    console.log(typeof id);
    return this.teasService.findOne(id); //return this.teasService.findOne('' + id);
  }

  @Post()
  create(@Body() createTeaDto: CreateTeaDto) {
    console.log(createTeaDto instanceof CreateTeaDto);
    return this.teasService.create(createTeaDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatedTeaDto: UpdateTeaDto) {
    return this.teasService.update(id, updatedTeaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teasService.remove(id);
  }
}
