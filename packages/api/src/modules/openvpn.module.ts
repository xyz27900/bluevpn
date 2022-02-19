import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { QUEUE_NAME } from '@/config';
import { OpenVpnService } from '@/services/openvpn.service';

@Module({
  imports: [
    BullModule.registerQueue({ name: QUEUE_NAME }),
  ],
  providers: [OpenVpnService],
  exports: [OpenVpnService],
})
export class OpenVpnModule {}
