import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '@/auth/local.startegy';
import { SessionSerializer } from '@/auth/session.serializer';
import { AuthController } from '@/controllers/auth.controller';
import { ResetModule } from '@/modules/reset.module';
import { UserModule } from '@/modules/user.module';
import { AuthService } from '@/services/auth.service';
import { MailService } from '@/services/mail.service';

@Module({
  imports: [PassportModule, UserModule, ResetModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer, MailService],
})
export class AuthModule {}
