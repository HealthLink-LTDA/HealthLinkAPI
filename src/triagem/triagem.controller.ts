import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TriagemService } from './triagem.service';
import { CreateTriagemDto } from './dto/create-triagem.dto';
import { UpdateTriagemDto } from './dto/update-triagem.dto';

@Controller('triagem')
export class TriagemController {
  constructor(private readonly triagemService: TriagemService) {}

  @Post()
  create(@Body() createTriagemDto: CreateTriagemDto) {
    return this.triagemService.create(createTriagemDto);
  }

  @Get()
  findAll() {
    return this.triagemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.triagemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTriagemDto: UpdateTriagemDto) {
    return this.triagemService.update(+id, updateTriagemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.triagemService.remove(+id);
  }
}
