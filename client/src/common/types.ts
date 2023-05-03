import {
  AcademicStatus, Building, Classroom,
  Day, Lesson,
  LessonTime,
  LessonType,
  Subgroup,
  Subject,
  Teacher,
  WeekType,
} from '../entities/entitiesClasses';
import {
  AcademicStatusDTO, BuildingDTO, ClassroomDTO,
  DayDTO, ID, LessonDTO,
  LessonTimeDTO,
  LessonTypeDTO, SubgroupDTO,
  SubjectDTO,
  TeacherDTO, WeekTypeDTO,
} from '../entities/entitiesDTO';

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type EntitiesNamesToTypes = {
  academicStatus: AcademicStatus;
  teacher: Teacher;
  lessonTime: LessonTime;
  day: Day;
  subject: Subject;
  lessonType: LessonType;
  weekType: WeekType;
  subgroup: Subgroup;
  building: Building;
  classroom: Classroom;
  lesson: Lesson;
};

export type AllEntities = EntitiesNamesToTypes[keyof EntitiesNamesToTypes];
export type AllEntitiesNames = keyof EntitiesNamesToTypes;

export type DtoOfEntity<T extends AllEntities> =
  T extends AcademicStatus ? AcademicStatusDTO
    : T extends Teacher ? TeacherDTO
      : T extends LessonTime ? LessonTimeDTO
        : T extends Subject ? SubjectDTO
          : T extends LessonType ? LessonTypeDTO
            : T extends Subgroup ? SubgroupDTO
              : T extends Building ? BuildingDTO
                : T extends Classroom ? ClassroomDTO
                  : T extends Lesson ? LessonDTO
                    : T extends Day ? DayDTO
                      : T extends WeekType ? WeekTypeDTO
                        : never;

type DtoFieldsToCorrespondingClasses<T extends DtoOfEntity<AllEntities>> = {
  [K in keyof T]: K extends AllEntitiesNames ? EntitiesNamesToTypes[K] : T[K];
};
export type ConstructorFor<T extends DtoOfEntity<AllEntities>> = DtoFieldsToCorrespondingClasses<T>;

type UnionToIntersection<U> =
  (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never
export type AllFields = UnionToIntersection<AllEntities>;

export type FieldType = 'string' | 'number' | 'entity';

// type DtoFieldsToIdType<T extends DtoOfEntity<AllEntities>> = {
//   [K in keyof T]: K extends AllEntitiesNames ? number : T[K];
// };
//
// // it's like DTO, but without id and all fields of DTO type transformed into just id of that object
// export type ValuesTypeInCreateForm<T extends AllEntities> = Omit<DtoFieldsToIdType<DtoOfEntity<T>>, 'id'>;
//
// type KeysOfType<T, U> = {
//   [P in keyof T]: T[P] extends U ? P : never;
// }[keyof T];
//
// type PickByType<T, U> = Pick<T, KeysOfType<T, U>>;
//
// export type EntityFieldsOf<T extends AllEntities> = PickByType<T, DtoOfEntity<AllEntities>>;
// // export type EntityFieldsOf<T extends AllEntities> = keyof PickByType<T, DtoOfEntity<AllEntities>>;
// // export type ArraysOfEntityFieldsOf<T extends AllEntities> = {[K in keyof EntityFieldsOf<T>]: Array<any>};
// export type ArraysOfEntityFieldsOf<T extends AllEntities> = {[K in keyof EntityFieldsOf<T>]: Array<T[K]>};

export type AllEntitiesItems = { [K in AllEntitiesNames]: Array<AllEntities> };


// export type FieldsOf<T extends AllEntities> = { [K in keyof Omit<DtoOfEntity<T>, 'id'>]: K extends AllEntitiesNames ? 'entity' : DtoOfEntity<T>[K] extends string ? 'string' : DtoOfEntity<T>[K] extends number ? 'number' : never };
export type FieldsOf<T extends AllEntities> = { [K in keyof Omit<DtoOfEntity<T>, 'id'>]: FieldType };

export type EmptyEntityOf<T extends AllEntities> = { [K in keyof Omit<DtoOfEntity<T>, 'id'>]: undefined };
type ThisTypeAndUndefined<T> = { [K in keyof T]: undefined | T[K] };
export type CreationTypeOf<T extends AllEntities> = ThisTypeAndUndefined<Omit<DtoOfEntity<T>, 'id'>>;

export type FilterType = 'subgroup' | 'teacher';

export type EditableLesson = Partial<LessonDTO> & { id: ID };

// export type DtoOfEntityName<T extends AllEntitiesNames> = T extends 'academicStatus'
//   ? AcademicStatusDTO
//   : never;
