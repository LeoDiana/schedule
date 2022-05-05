import { Module } from '@nestjs/common';
import { SubgroupsService } from './subgroups/subgroups.service';
import { SubgroupsController } from './subgroups/subgroups.controller';

@Module({
  providers: [SubgroupsService],
  controllers: [SubgroupsController]
})
export class SubgroupsModule {}
