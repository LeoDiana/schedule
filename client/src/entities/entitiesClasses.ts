import { ConstructorFor, EmptyEntityOf } from '../common/types';
import { AcademicStatusDTO, DayDTO, LessonTimeDTO, TeacherDTO } from './entitiesDTO';

interface Entity {
  id: number,
  displayName: string,
}

export class AcademicStatus implements AcademicStatusDTO, Entity {
  id: number;
  name: string;
  shortName: string;

  public get displayName(): string {
    return `${this.shortName}.`;
  }

  constructor(obj: AcademicStatusDTO) {
    const { name, shortName, id } = obj;
    this.name = name;
    this.shortName = shortName;
    this.id = id;
  }

  static createEmpty(): EmptyEntityOf<AcademicStatus> {
    return {
      name: undefined,
      shortName: undefined,
    };
  }
}

export class Teacher implements ConstructorFor<TeacherDTO>, Entity {
  id: number;
  firstName: string;
  surname: string;
  patronymic: string;
  academicStatus: AcademicStatus;

  public get displayName(): string {
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

  static createEmpty(): EmptyEntityOf<Teacher> {
    return {
      academicStatus: undefined,
      firstName: undefined,
      patronymic: undefined,
      surname: undefined,
    };
  }
}

export class LessonTime implements LessonTimeDTO, Entity {
  id: number;
  number: string;
  timeStart: string;
  timeEnd: string;

  public get displayName(): string {
    return `${this.number} ${this.timeStart}`;
  }

  constructor(obj: ConstructorFor<LessonTimeDTO>) {
    const { number, timeStart, timeEnd, id } = obj;
    this.number = number;
    this.timeStart = timeStart;
    this.timeEnd = timeEnd;
    this.id = id;
  }

  static createEmpty(): EmptyEntityOf<LessonTime> {
    return {
      number: undefined,
      timeStart: undefined,
      timeEnd: undefined,
    };
  }
}

export class Day implements DayDTO, Entity {
  id: number;
  name: string;

  public get displayName(): string {
    return this.name;
  }

  constructor(obj: ConstructorFor<DayDTO>) {
    const { name, id } = obj;
    this.name = name;
    this.id = id;
  }

  static createEmpty(): EmptyEntityOf<Day> {
    return {
      name: undefined,
    };
  }
}


// export class AcademicStatus implements AcademicStatusDTO, Entity {
//   public get displayName(): string {
//     return `${this.blah}`;
//   }
//
//   constructor(obj: ConstructorFor<DayDTO>) {
//     const { name, id } = obj;
//     this.name = name;
//     this.id = id;
//   }
//
//   static createEmpty(): EmptyEntityOf<Teacher> {
//     return {
//       academicStatus: undefined,
//       firstName: undefined,
//       patronymic: undefined,
//       surname: undefined,
//     };
//   }
// }
