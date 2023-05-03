export type ID = number;

export interface AcademicStatusDTO {
  id: ID;
  name: string;
  shortName: string;
}

export interface TeacherDTO {
  id: ID;
  firstName: string;
  surname: string;
  patronymic: string;
  academicStatus: AcademicStatusDTO;
}

export interface LessonTimeDTO {
  id: ID;
  number: string;
  timeStart: string;
  timeEnd: string;
}

export interface DayDTO {
  id: ID;
  name: string;
}

export interface SubjectDTO {
  id: ID;
  name: string;
  shortName: string;
}

export interface LessonTypeDTO {
  id: ID;
  name: string;
  shortName: string;
}

export interface WeekTypeDTO {
  id: ID;
  name: string;
}

export interface GroupDTO {
  id: ID;
  name: string;
  startYear: number;
}

export interface SubgroupDTO {
  id: ID;
  name?: string;
  group: GroupDTO;
  studentsNumber: number;
}

export interface BuildingDTO {
  id: ID;
  name: string;
  address: string;
}


export interface ClassroomDTO {
  id: ID;
  number: string;
  capacity: number;
  building: BuildingDTO;
}

export interface LessonDTO {
  id: ID;
  teacher: TeacherDTO;
  subject: SubjectDTO;
  lessonType: LessonTypeDTO;
  lessonTime?: LessonTimeDTO;
  classroom?: ClassroomDTO;
  day?: DayDTO;
  weekType: WeekTypeDTO;
  subgroup: SubgroupDTO;
}