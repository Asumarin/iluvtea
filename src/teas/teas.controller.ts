import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TeasService } from './teas.service';
import { CreateTeaDto } from './dto/create-tea.dto/create-tea.dto';
import { UpdateTeaDto } from './dto/update-tea.dto/update-tea.dto';


@Controller('teas')
export class TeasController {
    constructor(private readonly teasService: TeasService){}

    @Get()
    findAll(@Query() paginationQuery) {
        //const { limit, offset } = paginationQuery;
        return this.teasService.findAll();
        
    }

    @Get(':id')
    findOne(@Param('id') id: number){
        console.log(typeof id)
        return this.teasService.findOne('' + id);
    }

    @Post()
    create(@Body() createTeaDto: CreateTeaDto){
        console.log(createTeaDto instanceof CreateTeaDto);
        return this.teasService.create(createTeaDto);
    } 

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatedTeaDto: UpdateTeaDto){
        return this.teasService.update(id, updatedTeaDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return this.teasService.remove(id);
    }
}