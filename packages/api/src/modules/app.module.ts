import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER, REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from '@/config';
import { AuthModule } from '@/modules/auth.module';
import { OpenVpnModule } from '@/modules/openvpn.module';
import { PaymentsModule } from '@/modules/payments.module';
import { UserModule } from '@/modules/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB_HOST,
      port: DB_PORT,
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      synchronize: false,
      autoLoadEntities: true,
    }),
    BullModule.forRoot({
      redis: {
        host: REDIS_HOST,
        port: REDIS_PORT,
        password: REDIS_PASSWORD,
      },
    }),
    AuthModule,
    OpenVpnModule,
    PaymentsModule,
    UserModule,
  ],
})
export class AppModule {
  private readonly connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }
}
