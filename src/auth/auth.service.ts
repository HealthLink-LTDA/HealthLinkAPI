import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FuncionarioService } from '../funcionario/funcionario.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly funcionarioService: FuncionarioService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, senha: string): Promise<any> {
    this.logger.log(`Validating user with email: ${email}`);
    const funcionario = await this.funcionarioService.findByEmail(email);

    if (funcionario && (await bcrypt.compare(senha, funcionario.senha))) {
      this.logger.log(`User ${email} validated successfully`);
      const { senha, ...result } = funcionario;
      return result;
    }

    this.logger.warn(`Invalid credentials for user: ${email}`);
    return null;
  }

  async login(user: { email: string; senha: string }) {
    this.logger.log(`Attempting to log in user with email: ${user.email}`);
    const validUser = await this.validateUser(user.email, user.senha);

    if (!validUser) {
      this.logger.warn(`Failed login attempt for user: ${user.email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      email: validUser.email,
      sub: validUser.id,
      role: validUser.cargo.nome,
    };
    const token = this.jwtService.sign(payload);

    this.logger.log(`Token generated for user: ${user.email}`);
    return { access_token: token };
  }
}
