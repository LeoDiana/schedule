import {
  AcademicStatus,
  Building,
  Classroom,
  Day,
  Lesson,
  LessonTime,
  LessonType,
  Subgroup,
  Subject,
  Teacher,
  WeekType,
} from './entitiesInterfaces';

export type FormTypes = 'create' | 'update';

export interface AllEntitiesOfType<T> {
  academicStatus: T;
  teacher: T;
  subject: T;
  lessonType: T;
  lessonTime: T;
  day: T;
  weekType: T;
  building: T;
  classroom: T;
  subgroup: T;
  lesson: T;
}

export type AllEntities = keyof AllEntitiesOfType<any>;

type EntityInfoFieldTypes = 'text' | 'number' | 'entity';

export type FieldsOfType<T extends AllEntities> = T extends 'academicStatus'
  ? AcademicStatus
  : T extends 'teacher'
  ? Teacher
  : T extends 'subject'
  ? Subject
  : T extends 'lessonType'
  ? LessonType
  : T extends 'lessonTime'
  ? LessonTime
  : T extends 'day'
  ? Day
  : T extends 'weekType'
  ? WeekType
  : T extends 'building'
  ? Building
  : T extends 'classroom'
  ? Classroom
  : T extends 'subgroup'
  ? Subgroup
  : T extends 'lesson'
  ? Lesson
  : never;

export interface EntityInfoFieldSimple {
  label: string;
  type: EntityInfoFieldTypes;
}

export interface EntityInfoFieldComplex extends EntityInfoFieldSimple {
  type: 'entity';
  getEntitiesForList: () => Promise<any>;
  makeShortShownName: (obj: any) => string;
}

export type EntityInfoFields<T extends AllEntities> = {
  [K in keyof FieldsOfType<T>]: EntityInfoFieldSimple | EntityInfoFieldComplex;
};

export interface ApiEndpoints {
  readAll: () => Promise<any[]>;
  create: (obj: any) => Promise<string>;
  update: (obj: any) => Promise<string>;
  delete: (id: string) => Promise<string>;
}

export interface FormScheme<T extends AllEntities> {
  title: string;
  type: FormTypes;
  fields: EntityInfoFields<T>;
  apiCall: ApiEndpoints;
}
