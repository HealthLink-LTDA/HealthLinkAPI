import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FuncionarioService } from '../funcionario/funcionario.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly funcionarioService: FuncionarioService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, senha: string): Promise<any> {
    const funcionario = await this.funcionarioService.findByEmail(email);

    if (funcionario && funcionario.senha === senha) {
      const { ...result } = funcionario;
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
