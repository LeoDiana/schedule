import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LessonsModule } from './lessons/lessons.module';
import { TeachersModule } from './teachers/teachers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademicStatusesModule } from './academic-statuses/academic-statuses.module';

@Module({
  imports: [
    LessonsModule,
    TeachersModule,
    AcademicStatusesModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Indicates if database schema should be auto created on every application launch.
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
