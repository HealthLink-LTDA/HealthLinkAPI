import { Controller, Get, Post, Body, Put, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { TriagemService } from './triagem.service';
import { TriagemDto } from './dto/triagem.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Controller('triagem')
@ApiTags('Triagem')
export class TriagemController {
  constructor(private readonly triagemService: TriagemService,
              private readonly jwtStrategy: JwtStrategy
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() triagemDto: TriagemDto, @Request() req: any) {
    triagemDto.enfermeira = req.user.userId;
    return this.triagemService.create(triagemDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.triagemService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.triagemService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() triagemDto: TriagemDto, @Request() req: any) {
    triagemDto.enfermeira = req.user.userId;
    return this.triagemService.update(id, triagemDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.triagemService.remove(id);
  }
}
