export interface AcademicStatusDTO {
  id: number;
  name: string;
  shortName: string;
}

export interface TeacherDTO {
  id: number;
  firstName: string;
  surname: string;
  patronymic: string;
  academicStatus: AcademicStatusDTO;
}

export interface LessonTimeDTO {
  id: number;
  number: string;
  timeStart: string;
  timeEnd: string;
}

export interface DayDTO {
  id: number;
  name: string;
}

// export interface Subject {
//   id?: number;
//   name: string;
//   shortName: string;
// }
//
// export interface LessonType {
//   id?: number;
//   name: string;
//   shortName: string;
// }
//
//
//
// export interface WeekType {
//   id?: number;
//   name: string;
// }
//
// export interface Building {
//   id?: number;
//   name: string;
//   address: string;
// }
//
// export interface Group {
//   id?: number;
//   name: string;
//   startYear: number;
// }
//
// export interface Subgroup {
//   id?: number;
//   name: string;
//   group: Group;
//   studentsNumber: number;
// }
//
// export interface Teacher {
//   id?: number;
//   firstName: string;
//   surname: string;
//   patronymic: string;
//   academicStatus: AcademicStatus;
// }
//
// export interface Classroom {
//   id?: number;
//   number: string;
//   capacity: number;
//   building: Building;
// }
//
// export interface Lesson {
//   id?: number;
//   teacher: Teacher;
//   subject: Subject;
//   lessonType: LessonType;
//   lessonTime: LessonTime;
//   classroom: Classroom;
//   day: Day;
//   weekType: WeekType;
//   subgroup: Subgroup;
// }