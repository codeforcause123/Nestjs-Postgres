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
  Req,
  BadRequestException,
  All,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AgeDto } from './dto/age.dto';
import { User } from './entities/user.entity';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/payload')
  async queryWithPayload(@Body(new ValidationPipe()) agedto: AgeDto) {
    try {
      return await this.usersService.queryonage(agedto.age);
    } catch (error) {
      throw new BadRequestException('Age cannot be null or should be a number');
    }
  }
  @Get('/custom-query')
  async customquery(): Promise<User[]> {
    return await this.usersService.customquery();
  }
  @All('/handle-request')
  async handleRequest(
    @Req() request: any,
    @Body() requestBody: any,
    @Query() query: any,
  ): Promise<any> {
    const method = request.method;

    switch (method) {
      case 'GET':
        if (query.method === 'GETALL') {
          console.log('GET ALL');
          return this.usersService.getAllUsers();
        } else {
          console.log('GET', query);
          return this.usersService.getOneUser(3);
        }
      case 'POST':
        console.log(method, requestBody);
        return { method: 'POST METHOD', requestBody };
      case 'PUT':
        console.log(method);
        return { message: 'PUT METHOD' };
      case 'DELETE':
        console.log(method);
        return { message: 'DELETE METHOD' };
      // Add more cases for other HTTP methods as needed
      default:
        console.log(method);
        return { message: 'Invalid request method' };
    }
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
