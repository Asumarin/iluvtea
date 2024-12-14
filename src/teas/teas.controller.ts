import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('teas')
export class TeasController {
    @Get()
    findAll(@Query() paginationQuery) {
        const { limit, offset } = paginationQuery;
        return `This action returns all teas. Limit: ${limit}, offset: ${offset}`;
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return `This action returns #${id} tea`;
    }

    @Post()
    create(@Body() body){
        return body;
    } 

    @Patch(':id')
    update(@Param('id') id: string, @Body() body){
        return `This action updates #${id} tea`;
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return `This action removes #${id} tea`;
    }
}