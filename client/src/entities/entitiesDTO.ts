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
