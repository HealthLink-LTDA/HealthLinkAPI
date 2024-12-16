import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, ExecutionContext } from '@nestjs/common';
import { TriagemService } from './triagem.service';
import { CreateTriagemDto } from './dto/create-triagem.dto';
import { UpdateTriagemDto } from './dto/update-triagem.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Controller('triagem')
@ApiTags('Triagem')
export class TriagemController {
  constructor(private readonly triagemService: TriagemService,
              private readonly jwtStrategy: JwtStrategy
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createTriagemDto: CreateTriagemDto, @Request() req: any) {
    const user = req.user;
    createTriagemDto.enfermeira = user.userId;
    return this.triagemService.create(createTriagemDto);
  }

  // @Get()
  // findAll() {
  //   return this.triagemService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.triagemService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTriagemDto: UpdateTriagemDto) {
  //   return this.triagemService.update(+id, updateTriagemDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.triagemService.remove(+id);
  // }
}
