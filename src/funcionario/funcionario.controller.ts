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
    @Body() nome: string,
            email: string,
            senha: string,
            crm: string,
            cargoId: number
  ) {
    return this.funcionarioService.create(nome, email, senha, crm, cargoId);
  }

  @UseGuards(JwtAuthGuard)  
  @Get()
  getById( @Param() id: string ) {
    return this.funcionarioService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)  
  @Get()
  getByEmail( @Param() email: string ) {
    return this.funcionarioService.findByEmail(email);
  }

  @UseGuards(JwtAuthGuard)  
  @Delete()
  delete( @Param() id: string ) {
    return this.funcionarioService.remove(id);
  }

  @UseGuards(JwtAuthGuard)  
  @Put()
  update(
    @Body() id: string,
            nome: string,
            email: string,
            crm: string,
            cargoId: number
  ) {
    return this.funcionarioService.update(id, nome, email, crm, cargoId);
  }

}
