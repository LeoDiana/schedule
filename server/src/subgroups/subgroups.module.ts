import { Module } from '@nestjs/common';
import { SubgroupsService } from './subgroups/subgroups.service';
import { SubgroupsController } from './subgroups/subgroups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subgroup } from './subgroups.entity';
import { Group } from '../groups/groups.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subgroup, Group])],
  providers: [SubgroupsService],
  controllers: [SubgroupsController],
})
export class SubgroupsModule {}
