import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
@Injectable()
export class NinjasService {
  private ninjas = [
    { id: 0, name: 'Aayush', weapon: 'AK47' },
    {
      id: 1,
      name: 'Jose',
      weapon: 'M4A4',
    },
  ];
  getNinjas(weapon?: string) {
    if (weapon) {
      return this.ninjas.filter((ninja) => ninja.weapon === weapon);
    }
    return this.ninjas;
  }
  getOneNinja(id: number) {
    const ninja = this.ninjas.find((ninja) => ninja.id === id);
    if (!ninja) {
      throw new Error('error getting');
    }
    return ninja;
  }
  createNinja(createNinjaDto: CreateNinjaDto) {
    const newid = uuidv4();
    const numericUUID = parseInt(newid.replace(/-/g, '').slice(0, 16), 16);

    const newninja = {
      ...createNinjaDto,
      id: numericUUID,
    };
    this.ninjas.push(newninja);
    return newninja;
  }
  updateNinja(id: number, updateNinjaDto: UpdateNinjaDto) {
    this.ninjas = this.ninjas.map((ninja) => {
      if (ninja.id === id) {
        return { ...ninja, ...updateNinjaDto };
      }
      return ninja;
    });
    return this.getOneNinja(id);
  }
  removeNinja(id: number) {
    const tobeRemoved = this.getOneNinja(id);
    this.ninjas = this.ninjas.filter((ninja) => ninja.id !== id);
    return tobeRemoved;
  }
}
