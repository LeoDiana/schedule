import { LessonDTO, WeekTypeDTO } from '../common/entitiesDTO';
import { FilterType, ObjWithId } from '../common/types';

export function isFitFilters(
  weekType: WeekTypeDTO,
  filter: FilterType,
  filteredEntity: ObjWithId,
  lesson: LessonDTO,
  ) {
  return lesson.weekType?.id === weekType.id && lesson[filter]?.id === filteredEntity.id
}