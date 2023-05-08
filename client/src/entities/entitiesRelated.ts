import { ApiMethods, createEntityApi } from '../api/apiCalls';
import {
  AcademicStatusDTO,
  BuildingDTO,
  ClassroomDTO,
  DayDTO,
  LessonDTO,
  LessonTimeDTO,
  LessonTypeDTO,
  SubgroupDTO,
  SubjectDTO,
  TeacherDTO,
  WeekTypeDTO,
} from './entitiesDTO';
import {
  AllEntitiesNames,
  AllEntities,
  FieldType, EntitiesNamesToTypes,
} from '../common/types';

export type Fields<T extends AllEntities> = {
  [K in keyof Omit<T, 'id'>]: FieldType
}

interface EntityRelated<T extends AllEntities> {
  api: ApiMethods<T>;
  fields: Fields<T>;
  createEmpty: () => Partial<T>;
}

const AcademicStatusRelated: EntityRelated<AcademicStatusDTO> = {
  api: createEntityApi('academicStatus'),
  fields: {
    name: 'string',
    shortName: 'string',
  },
  createEmpty: () => ({
    name: undefined,
    shortName: undefined,
  }),
};

const TeacherRelated: EntityRelated<TeacherDTO> = {
  api: createEntityApi<TeacherDTO>('teacher'),
  fields: {
    firstName: 'string',
    surname: 'string',
    patronymic: 'string',
    academicStatus: 'entity',
  },
  createEmpty: () => ({
    surname: undefined,
    firstName: undefined,
    patronymic: undefined,
    academicStatus: undefined,
  }),
};

const LessonTimeRelated: EntityRelated<LessonTimeDTO> = {
  api: createEntityApi('lessonTime'),
  fields: {
    number: 'string',
    timeStart: 'string',
    timeEnd: 'string',
  },
  createEmpty: () => ({
    number: undefined,
    timeStart: undefined,
    timeEnd: undefined,
  }),
};

const DayRelated: EntityRelated<DayDTO> = {
  api: createEntityApi('day'),
  fields: {
    name: 'string',
  },
  createEmpty: () => ({
    name: undefined,
  }),
};

const SubjectRelated: EntityRelated<SubjectDTO> = {
  api: createEntityApi('subject'),
  fields: {
    name: 'string',
    shortName: 'string',
  },
  createEmpty: () => ({
    name: undefined,
    shortName: undefined,
  }),
};

const LessonTypeRelated: EntityRelated<LessonTypeDTO> = {
  api: createEntityApi('lessonType'),
  fields: {
    name: 'string',
    shortName: 'string',
  },
  createEmpty: () => ({
    name: undefined,
    shortName: undefined,
  }),
};

const WeekTypeRelated: EntityRelated<WeekTypeDTO> = {
  api: createEntityApi('weekType'),
  fields: {
    name: 'string',
  },
  createEmpty: () => ({
    name: undefined,
  }),
};

const SubgroupRelated: EntityRelated<SubgroupDTO> = {
  api: createEntityApi('subgroup'),
  fields: {
    name: 'string',
    studentsNumber: 'number',
    startYear: 'number',
  },
  createEmpty: () => ({
    name: undefined,
    studentsNumber: undefined,
    startYear: undefined,
  }),
};

const BuildingRelated: EntityRelated<BuildingDTO> = {
  api: createEntityApi('building'),
  fields: {
    name: 'string',
    address: 'string',
  },
  createEmpty: () => ({
    name: undefined,
    address: undefined,
  }),
};

const ClassroomRelated: EntityRelated<ClassroomDTO> = {
  api: createEntityApi('classroom'),
  fields: {
    number: 'string',
    capacity: 'number',
    building: 'entity',
  },
  createEmpty: () => ({
    number: undefined,
    capacity: undefined,
    building: undefined,
  }),
};

const LessonRelated: EntityRelated<LessonDTO> = {
  api: createEntityApi('lesson'),
  fields: {
    teacher: 'entity',
    subject: 'entity',
    lessonType: 'entity',
    lessonTime: 'entity',
    classroom: 'entity',
    day: 'entity',
    weekType: 'entity',
    subgroup: 'entity',
  },
  createEmpty: () => ({
    teacher: undefined,
    subject: undefined,
    lessonType: undefined,
    lessonTime: undefined,
    classroom: undefined,
    day: undefined,
    weekType: undefined,
    subgroup: undefined,
  }),
};

export const getDisplayName = (entityName: AllEntitiesNames, obj: any): string => {
  try {
    switch (entityName) {
      case 'academicStatus':
        return `${obj.shortName}.`;
      case 'teacher':
        return `${obj.surname} ${obj.firstName[0]}.${obj.patronymic[0]}.`;
      case 'lessonTime':
        return `${obj.number} ${obj.timeStart}-${obj.timeEnd}`;
      case 'day':
        return obj.name;
      case 'subject':
        return obj.shortName;
      case 'lessonType':
        return obj.shortName;
      case 'weekType':
        return obj.name;
      case 'subgroup':
        return obj.name;
      case 'building':
        return obj.name;
      case 'classroom':
        return `${obj.number} ${getDisplayName('building', obj.building)}`;
      case 'lesson':
        return `${getDisplayName('day', obj.day)} ${getDisplayName('lessonTime', obj.lessonTime)} ${getDisplayName('weekType', obj.weekType)} ${getDisplayName('subject', obj.subject)} ${getDisplayName('teacher', obj.teacher)} ${getDisplayName('subgroup', obj.subgroup)}`;
      default:
        return '';
    }
  } catch (err) {
    console.log('Current object does not have proper fields');
    return '';
  }
};


export const allEntitiesRelated: { [K in AllEntitiesNames]: EntityRelated<EntitiesNamesToTypes[K]> } = {
  academicStatus: AcademicStatusRelated,
  teacher: TeacherRelated,
  lessonTime: LessonTimeRelated,
  day: DayRelated,
  subject: SubjectRelated,
  lessonType: LessonTypeRelated,
  weekType: WeekTypeRelated,
  subgroup: SubgroupRelated,
  building: BuildingRelated,
  classroom: ClassroomRelated,
  lesson: LessonRelated,
};
