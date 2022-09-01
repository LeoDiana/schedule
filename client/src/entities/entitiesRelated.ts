import {AcademicStatus, Teacher} from './entitiesClasses';
import { ApiMethods, EntityApi } from '../api/apiCalls';
import {AcademicStatusDTO, TeacherDTO} from "./entitiesDTO";
import {
  AllEntities,
  AllEntitiesNames,
  ConstructorFor,
  DtoOfEntity,
  EntitiesNamesToTypes, FieldType,
  Optional
} from "../common/types";

export abstract class EntityRelated<T extends AllEntities> {
  // name: string;

  // constructor(name = 'base class') {
  //   this.name = name;
  // }

  abstract api: ApiMethods<T>;
  abstract fields: {[K in keyof Optional<DtoOfEntity<T>, 'id'>]: K extends AllEntitiesNames ? 'entity' : DtoOfEntity<T>[K]};
  abstract create(obj: ConstructorFor<T>): T;

 // eslint no-empty-function: "error"
  protected constructor() {
    // not empty, ok
  }
}

export class AcademicStatusRelated extends EntityRelated<AcademicStatus>{
  // name: string;
  api: ApiMethods<AcademicStatus>;
  fields: {[K in keyof Optional<AcademicStatusDTO, 'id'>]: K extends AllEntitiesNames ? 'entity' : AcademicStatusDTO[K]};

  constructor() {
    super();
    this.api = new EntityApi<AcademicStatus>('academicStatus', this.create);
    this.fields = {
      name: 'string',
      shortName: 'string',
    }
    // this.name = 'academicStatus';
    // super('academicStatus');
  }

  create(obj: AcademicStatusDTO): AcademicStatus {
    return new AcademicStatus(obj);
  }
  // create(obj: AcademicStatusDTO | undefined = undefined) {
  //   return obj ? new AcademicStatus(obj) : new AcademicStatus();
  // }
}

export class TeacherRelated extends EntityRelated<Teacher>{
  api: ApiMethods<Teacher>;
  fields: {[K in keyof Optional<TeacherDTO, 'id'>]: K extends AllEntitiesNames ? 'entity' : TeacherDTO[K]};

  constructor() {
    super();
    this.api = new EntityApi<Teacher>('teacher', this.create);
    this.fields = {
      firstName: 'string',
      surname: 'string',
      patronymic: 'string',
      academicStatus: 'entity',
    }
  }

  create(obj: TeacherDTO): Teacher {
    return new Teacher({...obj, academicStatus: new AcademicStatus(obj.academicStatus)});
  }
}

export const allEntitiesRelated: {[K in AllEntitiesNames]: EntityRelated<EntitiesNamesToTypes[K]>} = {
  academicStatus: new AcademicStatusRelated(),
  teacher: new TeacherRelated(),
}
