import { AllEntitiesNames, AllFields, FilterType } from './types';
import { CollisionMark } from './scheduleLogic';

export const ENTITY_TITLES: { [K in AllEntitiesNames]: string } = {
  academicStatus: 'Академічний статус',
  teacher: 'Викладач',
  lessonTime: 'Розклад пар',
  day: 'День',
  subject: 'Предмет',
  lessonType: 'Тип заняття',
  subgroup: 'Група',
  weekType: 'Тиждень',
  building: 'Корпус',
  classroom: 'Аудиторія',
  lesson: 'Заняття',
};

export const FIELD_TITLES: { [K in keyof AllFields]: string } = {
  id: '',
  // displayName: 'Відображуване імʼя',
  name: 'Назва',
  shortName: 'Скорочена назва',
  firstName: 'Імʼя',
  surname: 'Прізвище',
  patronymic: 'По батькові',
  number: 'Номер пари',
  timeStart: 'Час початку',
  timeEnd: 'Час закінчення',
  startYear: 'Рік початку',
  studentsNumber: 'Кількість студентів',
  capacity: 'Місткість',
  address: 'Адреса',
  ...ENTITY_TITLES,
};

export const MARKED_AS: { [K in CollisionMark]: string } = {
  conflict: 'конфлікт',
  ok: 'ок',
}

export const FILTERS: FilterType[] = ['subgroup', 'teacher'];
