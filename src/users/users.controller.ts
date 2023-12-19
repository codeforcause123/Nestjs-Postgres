import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/custom-query')
  async customquery(): Promise<any> {
    return await this.usersService.customquery();
  }
  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    try {
      return await this.usersService.getOneUser(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.getAllUsers();
  }
  @Post()
  async createUser(
    @Body(new ValidationPipe()) createUser: CreateUserDto,
  ): Promise<User> {
    return await this.usersService.createUser(createUser);
  }
  @Put(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) updateUser: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.updateUser(id, updateUser);
  }
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.usersService.deleteUser(id);
  }
}
