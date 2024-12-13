import { Controller, Get, Param } from '@nestjs/common';

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
}