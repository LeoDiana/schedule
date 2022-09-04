import {
  AcademicStatus,
  Day,
  Group,
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
  DayDTO, GroupDTO,
  LessonTimeDTO,
  LessonTypeDTO,
  SubgroupDTO,
  SubjectDTO,
  TeacherDTO, WeekTypeDTO,
} from './entitiesDTO';
import {
  AllEntities,
  AllEntitiesNames,
  ConstructorFor,
  EmptyEntityOf,
  EntitiesNamesToTypes,
  FieldsOf,
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
    this.api = new EntityApi<AcademicStatus>('academicStatus', this.create);
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
    this.api = new EntityApi<Teacher>('teacher', this.create);
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
    this.api = new EntityApi<LessonTime>('lessonTime', this.create);
    this.fields = {
      number: "string",
      timeStart: "string",
      timeEnd: "string",
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
    this.api = new EntityApi<Day>('day', this.create);
    this.fields = {
      name: "string",
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
    this.api = new EntityApi<Subject>('subject', this.create);
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
    this.api = new EntityApi<LessonType>('lessonType', this.create);
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
    this.api = new EntityApi<WeekType>('weekType', this.create);
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

export class GroupRelated extends EntityRelated<Group> {
  api: ApiMethods<Group>;
  fields: { [K in keyof Omit<GroupDTO, 'id'>]: K extends AllEntitiesNames ? 'entity' : GroupDTO[K] extends string ? 'string' : GroupDTO[K] extends number ? 'number' : never };

  constructor() {
    super();
    this.api = new EntityApi<Group>('group', this.create);
    this.fields = {
      name: 'string',
      startYear: 'number',
    };
  }

  create(obj: GroupDTO): Group {
    return new Group(obj);
  }

  createEmpty() {
    return Group.createEmpty();
  }
}

export class SubgroupRelated extends EntityRelated<Subgroup> {
  api: ApiMethods<Subgroup>;
  fields: { [K in keyof Omit<SubgroupDTO, 'id'>]: K extends AllEntitiesNames ? 'entity' : SubgroupDTO[K] extends string ? 'string' : SubgroupDTO[K] extends number ? 'number' : never };

  constructor() {
    super();
    this.api = new EntityApi<Subgroup>('subgroup', this.create);
    this.fields = {
      name: 'string',
      studentsNumber: 'number',
      group: 'entity',
    };
  }

  create(obj: SubgroupDTO): Subgroup {
    return new Subgroup({ ...obj, group: new Group(obj.group) });
  }

  createEmpty() {
    return Subgroup.createEmpty();
  }
}


//
// export class OoORelated extends EntityRelated<OoO> {
//   api: ApiMethods<OoO>;
//   fields: { [K in keyof Omit<OoODTO, 'id'>]: K extends AllEntitiesNames ? 'entity' : OoODTO[K] extends string ? 'string' : OoODTO[K] extends number ? 'number' : never };
//
//   constructor() {
//     super();
//     this.api = new EntityApi<OoO>('ooO', this.create);
//     this.fields = {
//       name: 'string',
//       shortName: 'string',
//     };
//   }
//
//   create(obj: OoODTO): OoO {
//     return new OoO(obj);
//   }
//
//   createEmpty() {
//     return OoO.createEmpty();
//   }
// }


export const allEntitiesRelated: { [K in AllEntitiesNames]: EntityRelated<EntitiesNamesToTypes[K]> } = {
  academicStatus: new AcademicStatusRelated(),
  teacher: new TeacherRelated(),
  lessonTime: new LessonTimeRelated(),
  day: new DayRelated(),
  subject: new SubjectRelated(),
  lessonType: new LessonTypeRelated(),
  weekType: new WeekTypeRelated(),
  group: new GroupRelated(),
  subgroup: new SubgroupRelated(),
};
