import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TeasService } from './teas.service';
import { CreateTeaDto } from './dto/create-tea.dto/create-tea.dto';
import { UpdateTeaDto } from './dto/update-tea.dto/update-tea.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { ParseIntPipe } from 'src/common/pipes/parse-int/parse-int.pipe';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('teas')
@Controller('teas')
export class TeasController {
  constructor(private readonly teasService: TeasService) {}

  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Public()
  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.teasService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    return this.teasService.findOne(id);
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
