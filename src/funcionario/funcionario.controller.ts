import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FuncionarioService } from './funcionario.service';
import { CargoGuard } from 'src/cargo/cargo.guard';
import { Roles } from 'src/cargo/cargo.decorator';

@Controller('funcionario')
@UseGuards(JwtAuthGuard, CargoGuard)
@Roles('admin')
export class FuncionarioController {
  private readonly logger = new Logger(FuncionarioController.name);

  constructor(private readonly funcionarioService: FuncionarioService) {}

  @Get()
  findAll() {
    this.logger.log('Fetching all funcionarios');
    return this.funcionarioService.findAll();
  }

  @Post()
  create(
    @Body('nome') nome: string,
    @Body('email') email: string,
    @Body('senha') senha: string,
    @Body('crm') crm: string,
    @Body('cargoId') cargoId: number,
  ) {
    this.logger.log(`Creating a new funcionario with email: ${email}`);
    return this.funcionarioService.create(nome, email, senha, crm, cargoId);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    this.logger.log(`Fetching funcionario by ID: ${id}`);
    return this.funcionarioService.findOneById(id);
  }

  @Get('email/:email')
  getByEmail(@Param('email') email: string) {
    this.logger.log(`Fetching funcionario by email: ${email}`);
    return this.funcionarioService.findByEmail(email);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    this.logger.log(`Deleting funcionario with ID: ${id}`);
    return this.funcionarioService.remove(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body('nome') nome: string,
    @Body('email') email: string,
    @Body('crm') crm: string,
    @Body('cargoId') cargoId: number,
  ) {
    this.logger.log(`Updating funcionario with ID: ${id}`);
    return this.funcionarioService.update(id, nome, email, crm, cargoId);
  }
}
