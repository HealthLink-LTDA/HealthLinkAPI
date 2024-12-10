import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FuncionarioService } from './funcionario.service';

@Controller('funcionario')
export class FuncionarioController {
  constructor(private readonly funcionarioService: FuncionarioService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.funcionarioService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body('nome') nome: string,
    @Body('email') email: string,
    @Body('senha') senha: string,
    @Body('crm') crm: string,
    @Body('cargoId') cargoId: number,
  ) {
    return this.funcionarioService.create(nome, email, senha, crm, cargoId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.funcionarioService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('email/:email')
  getByEmail(@Param('email') email: string) {
    return this.funcionarioService.findByEmail(email);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.funcionarioService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body('nome') nome: string,
    @Body('email') email: string,
    @Body('crm') crm: string,
    @Body('cargoId') cargoId: number,
  ) {
    return this.funcionarioService.update(id, nome, email, crm, cargoId);
  }
}
