import { Module } from '@nestjs/common';
import { DaysController } from './days/days.controller';
import { DaysService } from './days/days.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Day } from './days.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Day])],
  controllers: [DaysController],
  providers: [DaysService],
})
export class DaysModule {}
