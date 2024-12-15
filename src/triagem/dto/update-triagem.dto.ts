import { PartialType } from '@nestjs/mapped-types';
import { CreateTriagemDto } from './create-triagem.dto';

export class UpdateTriagemDto extends PartialType(CreateTriagemDto) {}
