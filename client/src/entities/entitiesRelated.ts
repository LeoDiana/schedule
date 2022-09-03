import { AcademicStatus, Teacher } from './entitiesClasses';
import { ApiMethods, EntityApi } from '../api/apiCalls';
import { AcademicStatusDTO, TeacherDTO } from './entitiesDTO';
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

export const allEntitiesRelated: { [K in AllEntitiesNames]: EntityRelated<EntitiesNamesToTypes[K]> } = {
  academicStatus: new AcademicStatusRelated(),
  teacher: new TeacherRelated(),
};
