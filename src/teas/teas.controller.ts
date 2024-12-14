import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('teas')
export class TeasController {
    @Get()
    findAll() {
        return 'This action returns all teas';
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