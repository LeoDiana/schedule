import { ConstructorFor } from '../common/types';
import { AcademicStatusDTO, TeacherDTO } from './entitiesDTO';

// base class with id and shownName
//
// abstract class Entity {
//   id: number;
//   abstract get shownName: () => string;
// }

export class AcademicStatus implements AcademicStatusDTO {
  id: number;
  name: string;
  shortName: string;

  public get shownName(): string {
    return `${this.shortName}.`;
  }

  constructor(obj: AcademicStatusDTO) {
    // const { name = '', shortName = '', id = undefined } = obj || {};
    const { name, shortName, id } = obj;
    this.name = name;
    this.shortName = shortName;
    this.id = id;
  }
}

export class Teacher implements ConstructorFor<TeacherDTO> {
  id: number;
  firstName: string;
  surname: string;
  patronymic: string;
  academicStatus: AcademicStatus;

  public get shownName(): string {
    return `${this.surname} ${this.firstName[0]}.${this.patronymic[0]}.`;
  }

  constructor(obj: ConstructorFor<TeacherDTO>) {
    const { firstName, surname, patronymic, academicStatus, id } = obj;
    this.firstName = firstName;
    this.surname = surname;
    this.patronymic = patronymic;
    this.academicStatus = academicStatus;
    this.id = id;
  }
}
