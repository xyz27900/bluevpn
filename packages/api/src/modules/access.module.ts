import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessOption } from '@/entity/access-option.entity';
import { AccessService } from '@/services/access.service';

@Module({
  imports: [TypeOrmModule.forFeature([AccessOption])],
  providers: [AccessService],
  exports: [AccessService],
})
export class AccessModule {}
