import { ConstructorFor, EmptyEntityOf } from '../common/types';
import {
  AcademicStatusDTO, BuildingDTO, ClassroomDTO,
  DayDTO, GroupDTO, LessonDTO,
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
    return `${this.number} ${this.timeStart}-${this.timeEnd}`;
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
  name?: string;
  group: Group;
  studentsNumber: number;

  public get displayName(): string {
    return `${this.group.displayName} ${this.name ? this.name : ''}`;
  }

  constructor(obj: ConstructorFor<SubgroupDTO>) {
    const { name, group, studentsNumber, id } = obj;
    this.name = name || undefined;
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

export class Building implements ConstructorFor<BuildingDTO>, Entity {
  id: number;
  name: string;
  address: string;

  public get displayName(): string {
    return this.name;
  }

  constructor(obj: ConstructorFor<BuildingDTO>) {
    const { name, address, id } = obj;
    this.name = name;
    this.address = address;
    this.id = id;
  }

  static createEmpty(): EmptyEntityOf<Building> {
    return {
      name: undefined,
      address: undefined,
    };
  }
}


export class Classroom implements ConstructorFor<ClassroomDTO>, Entity {
  id: number;
  number: string;
  capacity: number;
  building: Building;

  public get displayName(): string {
    return `${this.number} ${this.building.displayName}`;
  }

  constructor(obj: ConstructorFor<ClassroomDTO>) {
    const { number, capacity, building, id } = obj;
    this.number = number;
    this.capacity = capacity;
    this.building = building;
    this.id = id;
  }

  static createEmpty(): EmptyEntityOf<Classroom> {
    return {
      number: undefined,
      capacity: undefined,
      building: undefined,
    };
  }
}


export class Lesson implements ConstructorFor<LessonDTO>, Entity {
  id: number;
  teacher: Teacher;
  subject: Subject;
  lessonType: LessonType;
  lessonTime: LessonTime;
  classroom?: any;
  day: Day;
  weekType: WeekType;
  subgroup: Subgroup;

  public get displayName(): string {
    return `${this.day.displayName} ${this.lessonTime.displayName} ${this.weekType.displayName} ${this.subject.displayName} ${this.teacher.displayName} ${this.subgroup.displayName}`;
  }

  constructor(obj: ConstructorFor<LessonDTO>) {
    const { teacher, subject, lessonTime, lessonType, weekType, day, subgroup, classroom, id } = obj;
    this.teacher = teacher;
    this.subject = subject;
    this.lessonTime = lessonTime;
    this.lessonType = lessonType;
    this.weekType = weekType;
    this.day = day;
    this.subgroup = subgroup;
    this.classroom = classroom;
    this.id = id;
  }

  static createEmpty(): EmptyEntityOf<Lesson> {
    return {
      teacher: undefined,
      subject: undefined,
      lessonType: undefined,
      lessonTime: undefined,
      classroom: undefined,
      day: undefined,
      weekType: undefined,
      subgroup: undefined,
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


