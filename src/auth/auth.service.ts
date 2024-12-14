import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FuncionarioService } from '../funcionario/funcionario.service';

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

    if (funcionario && funcionario.senha === senha) {
      this.logger.log(`User ${email} validated successfully`);
      const { ...result } = funcionario;

      return result;
    }

    this.logger.warn(`Invalid credentials for user: ${email}`);
    return null;
  }

  async login(user: any) {
    this.logger.log(`Logging in user with email: ${user.email}`);
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);

    this.logger.log(`Token generated for user: ${user.email}`);
    return { access_token: token };
  }
}
