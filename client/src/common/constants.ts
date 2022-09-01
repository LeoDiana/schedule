import { AllEntities, AllEntitiesNames, DtoOfEntity } from './types';
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
  academicStatus: 'Academic status',
  teacher: 'Teacher'
}
