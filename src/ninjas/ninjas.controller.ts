import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Put,
  Delete,
  Body,
  NotFoundException,
  ParseIntPipe,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { AdminGuard } from 'src/admin/admin.guard';
@Controller('ninjas')
export class NinjasController {
  constructor(private readonly ninjasService: NinjasService) {}
  @Get('/new')
  newFunction() {
    return { message: 'new function message' };
  }
  @Get()
  getNinjaTypes(@Query('weapon') weapon: string) {
    return this.ninjasService.getNinjas(weapon);
  }
  @Get(':id')
  getOneNinja(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.ninjasService.getOneNinja(id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
  @UseGuards(AdminGuard)
  @Post()
  postOneNinja(@Body(new ValidationPipe()) newninja: CreateNinjaDto) {
    return this.ninjasService.createNinja(newninja);
  }
  @Put(':id')
  updateNinja(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) updateNinjaDto: UpdateNinjaDto,
  ) {
    return this.ninjasService.updateNinja(id, updateNinjaDto);
  }
  @Delete(':id')
  deleteNinja(@Param('id') id: string) {
    return this.ninjasService.removeNinja(+id);
  }
}
