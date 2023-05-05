import {
  AcademicStatus,
  Building,
  Classroom,
  Day,
  Lesson,
  LessonTime,
  LessonType,
  Subgroup,
  Subject,
  Teacher,
  WeekType,
} from './entitiesClasses';
import { ApiMethods, EntityApi } from '../api/apiCalls';
import {
  AcademicStatusDTO,
  BuildingDTO,
  ClassroomDTO,
  DayDTO,
  LessonDTO,
  LessonTimeDTO,
  LessonTypeDTO,
  SubgroupDTO,
  SubjectDTO,
  TeacherDTO,
  WeekTypeDTO,
} from './entitiesDTO';
import {
  AllEntities,
  AllEntitiesNames,
  ConstructorFor,
  EmptyEntityOf,
  EntitiesNamesToTypes,
  FieldsOf, FieldType,
} from '../common/types';


export abstract class EntityRelated<T extends AllEntities> {
  abstract api: ApiMethods<T>;
  abstract fields: FieldsOf<T>;

  abstract create(obj: ConstructorFor<T>): T;

  abstract createEmpty(): EmptyEntityOf<T>;

  protected constructor() {
    // not empty, ok
  }
}

export class AcademicStatusRelated extends EntityRelated<AcademicStatus> {
  api: ApiMethods<AcademicStatus>;
  fields: { [K in keyof Omit<AcademicStatusDTO, 'id'>]: K extends AllEntitiesNames ? 'entity' : AcademicStatusDTO[K] extends string ? 'string' : AcademicStatusDTO[K] extends number ? 'number' : never };

  constructor() {
    super();
    this.api = new EntityApi<AcademicStatus>('academicStatus');
    this.fields = {
      name: 'string',
      shortName: 'string',
    };
  }

  create(obj: AcademicStatusDTO): AcademicStatus {
    return new AcademicStatus(obj);
  }

  createEmpty() {
    return AcademicStatus.createEmpty();
  }
}

export class TeacherRelated extends EntityRelated<Teacher> {
  api: ApiMethods<Teacher>;
  fields: { [K in keyof Omit<TeacherDTO, 'id'>]: K extends AllEntitiesNames ? 'entity' : TeacherDTO[K] extends string ? 'string' : TeacherDTO[K] extends number ? 'number' : never };

  constructor() {
    super();
    this.api = new EntityApi<Teacher>('teacher');
    this.fields = {
      firstName: 'string',
      surname: 'string',
      patronymic: 'string',
      academicStatus: 'entity',
    };
  }

  create(obj: TeacherDTO): Teacher {
    return new Teacher({ ...obj, academicStatus: new AcademicStatus(obj.academicStatus) });
  }

  createEmpty() {
    return Teacher.createEmpty();
  }
}

export class LessonTimeRelated extends EntityRelated<LessonTime> {
  api: ApiMethods<LessonTime>;
  fields: { [K in keyof Omit<LessonTimeDTO, 'id'>]: K extends AllEntitiesNames ? 'entity' : LessonTimeDTO[K] extends string ? 'string' : LessonTimeDTO[K] extends number ? 'number' : never };

  constructor() {
    super();
    this.api = new EntityApi<LessonTime>('lessonTime');
    this.fields = {
      number: 'string',
      timeStart: 'string',
      timeEnd: 'string',
    };
  }

  create(obj: LessonTimeDTO): LessonTime {
    return new LessonTime(obj);
  }

  createEmpty() {
    return LessonTime.createEmpty();
  }
}

export class DayRelated extends EntityRelated<Day> {
  api: ApiMethods<Day>;
  fields: { [K in keyof Omit<DayDTO, 'id'>]: K extends AllEntitiesNames ? 'entity' : DayDTO[K] extends string ? 'string' : DayDTO[K] extends number ? 'number' : never };

  constructor() {
    super();
    this.api = new EntityApi<Day>('day');
    this.fields = {
      name: 'string',
    };
  }

  create(obj: DayDTO): Day {
    return new Day(obj);
  }

  createEmpty() {
    return Day.createEmpty();
  }
}


export class SubjectRelated extends EntityRelated<Subject> {
  api: ApiMethods<Subject>;
  fields: { [K in keyof Omit<SubjectDTO, 'id'>]: K extends AllEntitiesNames ? 'entity' : SubjectDTO[K] extends string ? 'string' : SubjectDTO[K] extends number ? 'number' : never };

  constructor() {
    super();
    this.api = new EntityApi<Subject>('subject');
    this.fields = {
      name: 'string',
      shortName: 'string',
    };
  }

  create(obj: SubjectDTO): Subject {
    return new Subject(obj);
  }

  createEmpty() {
    return Subject.createEmpty();
  }
}

export class LessonTypeRelated extends EntityRelated<LessonType> {
  api: ApiMethods<LessonType>;
  fields: { [K in keyof Omit<LessonTypeDTO, 'id'>]: K extends AllEntitiesNames ? 'entity' : LessonTypeDTO[K] extends string ? 'string' : LessonTypeDTO[K] extends number ? 'number' : never };

  constructor() {
    super();
    this.api = new EntityApi<LessonType>('lessonType');
    this.fields = {
      name: 'string',
      shortName: 'string',
    };
  }

  create(obj: LessonTypeDTO): LessonType {
    return new LessonType(obj);
  }

  createEmpty() {
    return LessonType.createEmpty();
  }
}

export class WeekTypeRelated extends EntityRelated<WeekType> {
  api: ApiMethods<WeekType>;
  fields: { [K in keyof Omit<WeekTypeDTO, 'id'>]: K extends AllEntitiesNames ? 'entity' : WeekTypeDTO[K] extends string ? 'string' : WeekTypeDTO[K] extends number ? 'number' : never };

  constructor() {
    super();
    this.api = new EntityApi<WeekType>('weekType');
    this.fields = {
      name: 'string',
    };
  }

  create(obj: WeekTypeDTO): WeekType {
    return new WeekType(obj);
  }

  createEmpty() {
    return WeekType.createEmpty();
  }
}

export class SubgroupRelated extends EntityRelated<Subgroup> {
  api: ApiMethods<Subgroup>;
  fields: { [K in keyof Required<Omit<SubgroupDTO, 'id'>>]: FieldType };

  constructor() {
    super();
    this.api = new EntityApi<Subgroup>('subgroup');
    this.fields = {
      name: 'string',
      studentsNumber: 'number',
      startYear: 'number'
    };
  }

  create(obj: SubgroupDTO): Subgroup {
    return new Subgroup(obj);
  }

  createEmpty() {
    return Subgroup.createEmpty();
  }
}

export class BuildingRelated extends EntityRelated<Building> {
  api: ApiMethods<Building>;
  fields: { [K in keyof Omit<BuildingDTO, 'id'>]: K extends AllEntitiesNames ? 'entity' : BuildingDTO[K] extends string ? 'string' : BuildingDTO[K] extends number ? 'number' : never };

  constructor() {
    super();
    this.api = new EntityApi<Building>('building');
    this.fields = {
      name: 'string',
      address: 'string',
    };
  }

  create(obj: BuildingDTO): Building {
    return new Building(obj);
  }

  createEmpty() {
    return Building.createEmpty();
  }
}


export class ClassroomRelated extends EntityRelated<Classroom> {
  api: ApiMethods<Classroom>;
  fields: { [K in keyof Omit<ClassroomDTO, 'id'>]: K extends AllEntitiesNames ? 'entity' : ClassroomDTO[K] extends string ? 'string' : ClassroomDTO[K] extends number ? 'number' : never };

  constructor() {
    super();
    this.api = new EntityApi<Classroom>('classroom');
    this.fields = {
      number: 'string',
      capacity: 'number',
      building: 'entity',
    };
  }

  create(obj: ClassroomDTO): Classroom {
    return new Classroom({ ...obj, building: new Building(obj.building) });
  }

  createEmpty() {
    return Classroom.createEmpty();
  }
}


export class LessonRelated extends EntityRelated<Lesson> {
  api: ApiMethods<Lesson>;
  fields: { [K in keyof Omit<LessonDTO, 'id'>]: K extends AllEntitiesNames ? 'entity' : LessonDTO[K] extends string ? 'string' : LessonDTO[K] extends number ? 'number' : never };

  constructor() {
    super();
    this.api = new EntityApi<Lesson>('lesson');
    this.fields = {
      teacher: 'entity',
      subject: 'entity',
      lessonType: 'entity',
      lessonTime: 'entity',
      classroom: 'entity',
      day: 'entity',
      weekType: 'entity',
      subgroup: 'entity',
    };
  }

  create(obj: LessonDTO): Lesson {
    return new Lesson({
      ...obj,
      teacher: new Teacher({ ...obj.teacher, academicStatus: new AcademicStatus(obj.teacher.academicStatus) }),
      subject: new Subject(obj.subject),
      lessonType: new LessonType(obj.lessonType),
      lessonTime: obj.lessonTime ? new LessonTime(obj.lessonTime) : undefined,
      classroom: obj.classroom ? new Classroom({
        ...obj.classroom,
        building: new Building(obj.classroom.building),
      }) : undefined,
      day: obj.day ? new Day(obj.day) : undefined,
      weekType: obj.weekType ? new WeekType(obj.weekType) : undefined,
      subgroup: new Subgroup(obj.subgroup),
    });
  }

  createEmpty() {
    return Lesson.createEmpty();
  }
}

export const getDisplayName = (entityName: AllEntitiesNames, obj: any): string => {
  try {
    switch (entityName) {
      case 'academicStatus':
        return `${obj.shortName}.`;
      case 'teacher':
        return `${obj.surname} ${obj.firstName[0]}.${obj.patronymic[0]}.`;
      case 'lessonTime':
        return `${obj.number} ${obj.timeStart}-${obj.timeEnd}`;
      case 'day':
        return obj.name;
      case 'subject':
        return obj.shortName;
      case 'lessonType':
        return obj.shortName;
      case 'weekType':
        return obj.name;
      case 'subgroup':
        return obj.name;
      case 'building':
        return obj.name;
      case 'classroom':
        return `${obj.number} ${getDisplayName('building', obj.building)}`;
      case 'lesson':
        return `${getDisplayName('day', obj.day)} ${getDisplayName('lessonTime', obj.lessonTime)} ${getDisplayName('weekType', obj.weekType)} ${getDisplayName('subject', obj.subject)} ${getDisplayName('teacher', obj.teacher)} ${getDisplayName('subgroup', obj.subgroup)}`;
      default:
        return '';
    }
  } catch (err) {
    console.log('Current object does not have proper fields');
    return '';
  }
};


export const allEntitiesRelated: { [K in AllEntitiesNames]: EntityRelated<EntitiesNamesToTypes[K]> } = {
  academicStatus: new AcademicStatusRelated(),
  teacher: new TeacherRelated(),
  lessonTime: new LessonTimeRelated(),
  day: new DayRelated(),
  subject: new SubjectRelated(),
  lessonType: new LessonTypeRelated(),
  weekType: new WeekTypeRelated(),
  subgroup: new SubgroupRelated(),
  building: new BuildingRelated(),
  classroom: new ClassroomRelated(),
  lesson: new LessonRelated(),
};
