import { ConstructorFor, EmptyEntityOf } from '../common/types';
import {
  AcademicStatusDTO,
  DayDTO, GroupDTO,
  LessonTimeDTO,
  LessonTypeDTO,
  SubgroupDTO,
  SubjectDTO,
  TeacherDTO, WeekTypeDTO,
} from './entitiesDTO';

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
    this.surname = surname;
    this.firstName = firstName;
    this.patronymic = patronymic;
    this.academicStatus = academicStatus;
    this.id = id;
  }

  static createEmpty(): EmptyEntityOf<Teacher> {
    return {
      surname: undefined,
      firstName: undefined,
      patronymic: undefined,
      academicStatus: undefined,
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

export class Subject implements SubjectDTO, Entity {
  id: number;
  name: string;
  shortName: string;

  public get displayName(): string {
    return this.shortName;
  }

  constructor(obj: ConstructorFor<SubjectDTO>) {
    const { name, shortName, id } = obj;
    this.name = name;
    this.shortName = shortName;
    this.id = id;
  }

  static createEmpty(): EmptyEntityOf<Subject> {
    return {
      name: undefined,
      shortName: undefined
    };
  }
}

export class LessonType implements LessonTypeDTO, Entity {
  id: number;
  name: string;
  shortName: string;

  public get displayName(): string {
    return `${this.shortName}.`;
  }

  constructor(obj: ConstructorFor<LessonTypeDTO>) {
    const { name, shortName, id } = obj;
    this.name = name;
    this.shortName = shortName;
    this.id = id;
  }

  static createEmpty(): EmptyEntityOf<LessonType> {
    return {
      name: undefined,
      shortName: undefined
    };
  }
}

export class WeekType implements ConstructorFor<WeekTypeDTO>, Entity {
  id: number;
  name: string;

  public get displayName(): string {
    return this.name;
  }

  constructor(obj: ConstructorFor<WeekTypeDTO>) {
    const { name, id } = obj;
    this.name = name;
    this.id = id;
  }

  static createEmpty(): EmptyEntityOf<WeekType> {
    return {
      name: undefined
    };
  }
}

export class Group implements ConstructorFor<GroupDTO>, Entity {
  id: number;
  name: string;
  startYear: number;

  public get displayName(): string {
    return this.name;
  }

  constructor(obj: ConstructorFor<GroupDTO>) {
    const { name, startYear, id } = obj;
    this.name = name;
    this.startYear = startYear;
    this.id = id;
  }

  static createEmpty(): EmptyEntityOf<Group> {
    return {
      name: undefined,
      startYear: undefined,
    };
  }
}


export class Subgroup implements ConstructorFor<SubgroupDTO>, Entity {
  id: number;
  name: string; // if there is no subgroup, it should = '-'
  group: Group;
  studentsNumber: number;

  public get displayName(): string {
    return `${this.group.displayName} ${this.name}`;
  }

  constructor(obj: ConstructorFor<SubgroupDTO>) {
    const { name, group, studentsNumber, id } = obj;
    this.name = name;
    this.studentsNumber = studentsNumber;
    this.group = group;
    this.id = id;
  }

  static createEmpty(): EmptyEntityOf<Subgroup> {
    return {
      name: undefined,
      studentsNumber: undefined,
      group: undefined,
    };
  }
}


// export class OoO implements ConstructorFor<OoODTO>, Entity {
//   // fields
//
//   public get displayName(): string {
//     return `${this.surname} ${this.firstName[0]}.${this.patronymic[0]}.`;
//   }
//
//   constructor(obj: ConstructorFor<OoODTO>) {
//     const { firstName, surname, patronymic, academicStatus, id } = obj;
//     this.surname = surname;
//     this.firstName = firstName;
//     this.patronymic = patronymic;
//     this.academicStatus = academicStatus;
//     this.id = id;
//   }
//
//   static createEmpty(): EmptyEntityOf<OoO> {
//     return {
//     };
//   }
// }


