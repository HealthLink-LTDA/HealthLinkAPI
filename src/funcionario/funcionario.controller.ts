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
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('funcionario')
@UseGuards(JwtAuthGuard, CargoGuard)
@ApiTags('Funcionario')
@ApiBearerAuth()
export class FuncionarioController {
  private readonly logger = new Logger(FuncionarioController.name);

  constructor(private readonly funcionarioService: FuncionarioService) {}

  @Get()
  @ApiOperation({ summary: 'Get all funcionarios' })
  @ApiResponse({ status: 200, description: 'List of funcionarios' })
  findAll() {
    this.logger.log('Fetching all funcionarios');
    return this.funcionarioService.findAll();
  }

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Create a new funcionario' })
  @ApiResponse({ status: 201, description: 'Funcionario created successfully' })
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
  @ApiOperation({ summary: 'Get a funcionario by ID' })
  @ApiResponse({ status: 200, description: 'Funcionario details' })
  getById(@Param('id') id: string) {
    this.logger.log(`Fetching funcionario by ID: ${id}`);
    return this.funcionarioService.findOneById(id);
  }

  @Get('email/:email')
  @ApiOperation({ summary: 'Get a funcionario by email' })
  @ApiResponse({ status: 200, description: 'Funcionario details' })
  getByEmail(@Param('email') email: string) {
    this.logger.log(`Fetching funcionario by email: ${email}`);
    return this.funcionarioService.findByEmail(email);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Delete a funcionario by ID' })
  @ApiResponse({ status: 200, description: 'Funcionario deleted successfully' })
  delete(@Param('id') id: string) {
    this.logger.log(`Deleting funcionario with ID: ${id}`);
    return this.funcionarioService.remove(id);
  }

  @Put(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Update a funcionario by ID' })
  @ApiResponse({ status: 200, description: 'Funcionario updated successfully' })
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
