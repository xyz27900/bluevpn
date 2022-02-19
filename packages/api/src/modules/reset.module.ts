import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResetToken } from '@/entity/reset-token.entity';
import { ResetService } from '@/services/reset.service';

@Module({
  imports: [TypeOrmModule.forFeature([ResetToken])],
  providers: [ResetService],
  exports: [ResetService],
})
export class ResetModule {}
