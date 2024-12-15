import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Cargo } from './cargo.entity';
import { getRolesFromDatabase } from './cargo.decorator';

@Injectable()
export class RoleService {
  constructor(private readonly dataSource: DataSource) {}

  async fetchRoles(): Promise<string[]> {
    const cargoRepository = this.dataSource.getRepository(Cargo);
    return await getRolesFromDatabase(cargoRepository);
  }
}
