import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects/subjects.service';
import { SubjectsController } from './subjects/subjects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './subjects.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subject])],
  providers: [SubjectsService],
  controllers: [SubjectsController],
})
export class SubjectsModule {}
