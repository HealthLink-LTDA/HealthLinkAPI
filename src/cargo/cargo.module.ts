import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cargo } from './cargo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cargo])],
})
export class CargoModule {}
