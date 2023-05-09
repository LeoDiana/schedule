import { DayDTO, LessonTimeDTO } from '../common/entitiesDTO';

interface Props {
  lessonTime?: LessonTimeDTO,
  day?: DayDTO
}

export function inGridPosition({ lessonTime, day }: Props) {
  const row = lessonTime ? Number(lessonTime.id) + 1 : 1;
  const column = day ? Number(day.id) + 1 : 1;

  return ({
    gridRowStart: row,
    gridColumnStart: column,
  });
}