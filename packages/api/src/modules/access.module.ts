import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessController } from '@/controllers/access.controller';
import { AccessOption } from '@/entity/access-option.entity';
import { InviteModule } from '@/modules/invite.module';
import { OpenVpnModule } from '@/modules/openvpn.module';
import { UserModule } from '@/modules/user.module';
import { AccessService } from '@/services/access.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccessOption]),
    InviteModule,
    OpenVpnModule,
    UserModule,
  ],
  controllers: [AccessController],
  providers: [AccessService],
})
export class AccessModule {}
