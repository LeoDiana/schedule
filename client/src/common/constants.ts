import {AllEntities, AllEntitiesNames, AllFields, DtoOfEntity} from './types';
import { instance as axios } from '../api/axiosConfig';
import { AcademicStatus } from '../entities/entitiesClasses';

// export const ENDPOINTS: { [K in AllEntitiesNames]: string } = {
//   academicStatus: 'academic-statuses',
//   // teacher: 'teachers',
//   // subject: 'subjects',
//   // lessonType: 'lesson-types',
//   // lessonTime: 'lesson-times',
//   // day: 'days',
//   // weekType: 'week-types',
//   // building: 'buildings',
//   // classroom: 'classrooms',
//   // subgroup: 'subgroups',
//   // group: 'groups',
//   // lesson: 'lessons',
// } as const;

export const ENTITY_TITLES: {[K in AllEntitiesNames]: string} = {
  academicStatus: 'Академічний статус',
  teacher: 'Викладач'
}

export const FIELD_TITLES: {[K in keyof AllFields]: string} = {
  id: '',
  displayName: 'Відображуване імʼя',
  name: 'Назва',
  shortName: 'Скорочена назва',
  firstName: 'Імʼя',
  surname: 'Прізвище',
  patronymic: 'По батькові',
  ...ENTITY_TITLES
}
