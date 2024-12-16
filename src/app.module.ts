import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PacienteModule } from './paciente/paciente.module';
import { FuncionarioModule } from './funcionario/funcionario.module';
import { DataSource } from 'typeorm';
import { CargoModule } from './cargo/cargo.module';
import { TriagemModule } from './triagem/triagem.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
    AuthModule,
    PacienteModule,
    FuncionarioModule,
    CargoModule,
    TriagemModule
  ],
  providers: [],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly dataSource: DataSource) {}

  async onModuleInit() {
    const roles = await this.dataSource.query(`SELECT nome FROM cargo`);
    console.log(
      'Available Roles:',
      roles.map((r) => r.nome),
    );
  }
}
