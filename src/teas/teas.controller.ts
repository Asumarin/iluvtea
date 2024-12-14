import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TeasService } from './teas.service';


@Controller('teas')
export class TeasController {
    constructor(private readonly teasService: TeasService){}

    @Get()
    findAll(@Query() paginationQuery) {
        //const { limit, offset } = paginationQuery;
        return this.teasService.findAll();
        
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.teasService.findOne(id);
    }

    @Post()
    create(@Body() body){
        return this.teasService.create(body);
    } 

    @Patch(':id')
    update(@Param('id') id: string, @Body() body){
        return this.teasService.update(id, body);
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return this.teasService.remove(id);
    }
}