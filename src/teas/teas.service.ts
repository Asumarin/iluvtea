import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Tea } from './entities/tea.entity';

@Injectable()
export class TeasService{
    private teas: Tea[] = [
        {
            id: 1,
            name: 'Golden Ceylon',
            brand: 'Grinfield',
            flavours: ['golden', 'ceylon']
        },
    ];

    findAll(){
        return this.teas;
    }

    findOne(id: string){
        const tea = this.teas.find(item => item.id === +id);
        if(!tea){
            throw new NotFoundException(`Tea #${id} not found`);
        }
        return tea;
    }

    create(createTeaDto: any){
        this.teas.push(createTeaDto)
        return createTeaDto;
    }

    update(id: string, updateTeaDto: any){
        const existingTea = this.findOne(id);
        if(existingTea){
            //update this
        }
    }

    remove(id: string){
        const teaIndex = this.teas.findIndex(item => item.id === +id);
        if(teaIndex >= 0){
            this.teas.splice(teaIndex, 1);
        }
    }
}
