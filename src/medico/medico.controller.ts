import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MedicoSerivce } from './medico.service';

@Controller('medico')
export class MedicoController {
  constructor(private readonly medicoService: MedicoSerivce) {}

  @Get()
  findAll() {
    return this.medicoService.findAll();
  }
}
