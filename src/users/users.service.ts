import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  //Getting all users
  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }
  //Getting single user
  async getOneUser(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }
  //Creating user
  async createUser(newuserdto: CreateUserDto): Promise<User> {
    const newid = uuidv4();
    const numericUUID = parseInt(newid.replace(/-/g, '').slice(0, 6), 16);
    const newUser = {
      ...newuserdto,
      id: numericUUID,
    };
    return await this.userRepository.save(newUser);
  }
  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return await this.userRepository.findOne({ where: { id } });
  }
  //Delete User
  async deleteUser(id: number): Promise<any> {
    await this.userRepository.delete(id);
    return { message: `User deleted with id: ${id}` };
  }
  async customquery(): Promise<User[]> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.name LIKE :name', { name: 'A%' })
      .andWhere('user.age >= :age', { age: 14 })
      .getMany();
  }
  async queryonage(age: number): Promise<User[]> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.age >= :age', { age: age })
      .getMany();
  }
}
