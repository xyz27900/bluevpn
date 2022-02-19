import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invite } from '@/entity/invite.entity';
import { InviteService } from '@/services/invite.service';

@Module({
  imports: [TypeOrmModule.forFeature([Invite])],
  providers: [InviteService],
  exports: [InviteService],
})
export class InviteModule {}
