import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('teas')
export class TeasController {
    @Get('flavors')
    findAll() {
        return 'This action returns all teas'
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return `This action returns #${id} tea`
    }

    @Post()
    create(@Body() body){
        return body;
    } 
}