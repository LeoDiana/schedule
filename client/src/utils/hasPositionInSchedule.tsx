import { LessonDTO } from '../common/entitiesDTO';

export function hasPositionInSchedule(lesson: LessonDTO): boolean {
  return !!(lesson.lessonTime && lesson.day);
}