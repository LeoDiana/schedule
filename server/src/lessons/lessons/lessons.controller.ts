import { Controller, Get } from '@nestjs/common';

@Controller('lessons')
export class LessonsController {
  @Get()
  index(): string {
    return 'Return contacts';
  }
}
