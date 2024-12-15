import { SetMetadata } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Cargo } from './cargo.entity';

export const ROLES_KEY = Symbol('roles');

export const Roles = (...roles: string[]) => {
  return SetMetadata(ROLES_KEY, roles);
};

export async function getRolesFromDatabase(
  cargoRepository: Repository<Cargo>,
): Promise<string[]> {
  const cargos = await cargoRepository.find();
  return cargos.map((cargo) => cargo.nome);
}
