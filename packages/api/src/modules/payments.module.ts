import { Module } from '@nestjs/common';
import { PaymentsController } from '@/controllers/payments.controller';
import { AccessModule } from '@/modules/access.module';
import { InviteModule } from '@/modules/invite.module';
import { OpenVpnModule } from '@/modules/openvpn.module';
import { OrderModule } from '@/modules/order.module';
import { UserModule } from '@/modules/user.module';
import { BlockchainService } from '@/services/blockchain.service';

@Module({
  imports: [AccessModule, InviteModule, OpenVpnModule, OrderModule, UserModule],
  controllers: [PaymentsController],
  providers: [BlockchainService],
})
export class PaymentsModule {}
