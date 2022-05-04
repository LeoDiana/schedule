import { AcademicStatusId } from './AcademicStatus';

export interface Teacher {
  id?: string;
  firstName: string;
  surname: string;
  patronymic: string;
  academicStatus: AcademicStatusId;
}

export interface TeacherId extends Teacher {
  id: string;
}
