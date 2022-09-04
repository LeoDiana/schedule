import { AllEntitiesNames, AllFields } from './types';

export const ENTITY_TITLES: { [K in AllEntitiesNames]: string } = {
  academicStatus: 'Академічний статус',
  teacher: 'Викладач',
  lessonTime: 'Розклад пар',
  day: 'День',
  subject: 'Предмет',
  lessonType: 'Тип заняття',
  group: 'Група',
  subgroup: 'Підгрупа',
  weekType: 'Тип тижня',
};

export const FIELD_TITLES: { [K in keyof AllFields]: string } = {
  id: '',
  displayName: 'Відображуване імʼя',
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
  ...ENTITY_TITLES,
};
