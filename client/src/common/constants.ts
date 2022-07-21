import { AllEntities, FilterTypes } from './types';

export const ERROR_MESSAGE = 'Error occurred';
export const SUCCESS_MESSAGE = 'Success';

export const ENDPOINTS: { [k in AllEntities]: string } = {
  academicStatus: 'academic-statuses',
  teacher: 'teachers',
  subject: 'subjects',
  lessonType: 'lesson-types',
  lessonTime: 'lesson-times',
  day: 'days',
  weekType: 'week-types',
  building: 'buildings',
  classroom: 'classrooms',
  subgroup: 'subgroups',
  group: 'groups',
  lesson: 'lessons',
};

export const ENTITY_SHOWN_NAMES: { [k in AllEntities]: string } = {
  academicStatus: 'Academic status',
  teacher: 'Teacher',
  subject: 'Subject',
  lessonType: 'Lesson type',
  lessonTime: 'Lesson time',
  day: 'Day',
  weekType: 'Week type',
  building: 'Building',
  classroom: 'Classroom',
  subgroup: 'Subgroup',
  group: 'Group',
  lesson: 'Lesson',
};

export const FILTERS: FilterTypes[] = ['subgroup', 'teacher'];
