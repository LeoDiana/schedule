import {
  AcademicStatusDTO, BuildingDTO, ClassroomDTO,
  DayDTO, ID, LessonDTO,
  LessonTimeDTO,
  LessonTypeDTO, SubgroupDTO,
  SubjectDTO,
  TeacherDTO, WeekTypeDTO,
} from './entitiesDTO';

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type EntitiesNamesToTypes = {
  academicStatus: AcademicStatusDTO;
  teacher: TeacherDTO;
  lessonTime: LessonTimeDTO;
  day: DayDTO;
  subject: SubjectDTO;
  lessonType: LessonTypeDTO;
  weekType: WeekTypeDTO;
  subgroup: SubgroupDTO;
  building: BuildingDTO;
  classroom: ClassroomDTO;
  lesson: LessonDTO;
};

export type AllEntities = EntitiesNamesToTypes[keyof EntitiesNamesToTypes];
export type AllEntitiesNames = keyof EntitiesNamesToTypes;

type UnionToIntersection<U> =
  (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never
export type AllFields = UnionToIntersection<AllEntities>;

export type FieldType = 'string' | 'number' | 'entity';

export type AllEntitiesItems = { [K in AllEntitiesNames]: Array<EntitiesNamesToTypes[K]> };

export type FilterType = 'subgroup' | 'teacher' | 'classroom';

export interface ObjWithId {
  id: ID;
}

export type setState<T> = React.Dispatch<React.SetStateAction<T>>
