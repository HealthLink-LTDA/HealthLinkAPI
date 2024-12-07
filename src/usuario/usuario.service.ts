import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(nome: string, email: string, senha: string): Promise<Usuario> {
    const hashedPassword = await bcrypt.hash(senha, 10);
    const novoUsuario = this.usuarioRepository.create({
      nome,
      email,
      senha: hashedPassword,
    });
    return this.usuarioRepository.save(novoUsuario);
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async findOneById(id: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return usuario;
  }

  async findByEmail(email: string): Promise<Usuario> {
    return this.usuarioRepository.findOne({ where: { email } });
  }

  async update(id: string, nome: string, email: string): Promise<Usuario> {
    const usuario = await this.findOneById(id);
    usuario.nome = nome;
    usuario.email = email;
    return this.usuarioRepository.save(usuario);
  }

  async remove(id: string): Promise<void> {
    const usuario = await this.findOneById(id);
    await this.usuarioRepository.remove(usuario);
  }
}
