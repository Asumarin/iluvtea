import { Injectable } from '@nestjs/common';
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
        return this.teas.find(item => item.id === +id);
    }

    create(createTeaDto: any){
        this.teas.push(createTeaDto);
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
