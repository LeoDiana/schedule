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

export interface SubjectDTO {
  id: number;
  name: string;
  shortName: string;
}

export interface LessonTypeDTO {
  id: number;
  name: string;
  shortName: string;
}

export interface WeekTypeDTO {
  id: number;
  name: string;
}

export interface GroupDTO {
  id: number;
  name: string;
  startYear: number;
}

export interface SubgroupDTO {
  id: number;
  name: string;
  group: GroupDTO;
  studentsNumber: number;
}


// export interface Building {
//   id?: number;
//   name: string;
//   address: string;
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