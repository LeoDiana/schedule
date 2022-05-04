export interface AcademicStatus {
  id?: string;
  name: string;
  shortName: string;
}

export interface Teacher {
  id?: string;
  firstName: string;
  surname: string;
  patronymic: string;
  academicStatus: AcademicStatus;
}
