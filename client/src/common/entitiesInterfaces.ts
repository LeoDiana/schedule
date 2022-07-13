export interface AcademicStatus {
  id?: string;
  name: string;
  shortName: string;
}

export interface Subject {
  id?: string;
  name: string;
  shortName: string;
}

export interface LessonType {
  id?: string;
  name: string;
  shortName: string;
}

export interface LessonTime {
  id?: string;
  number: string;
  timeStart: string;
  timeEnd: string;
}

export interface Day {
  id?: string;
  name: string;
}

export interface WeekType {
  id?: string;
  name: string;
}

export interface Building {
  id?: string;
  name: string;
  address: string;
}

export interface Subgroup {
  id?: string;
  name: string;
  groupName: string;
  studentsNumber: number;
}

export interface Teacher {
  id?: string;
  firstName: string;
  surname: string;
  patronymic: string;
  academicStatus: AcademicStatus;
}

export interface Classroom {
  id?: string;
  number: string;
  capacity: number;
  building: Building;
}

export interface Lesson {
  id?: string;
  teacher: Teacher;
  subject: Subject;
  lessonType: LessonType;
  lessonTime: LessonTime;
  classroom: Classroom;
  day: Day;
  weekType: WeekType;
  subgroup: Subgroup;
}
