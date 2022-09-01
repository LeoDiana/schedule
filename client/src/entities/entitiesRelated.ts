import {AcademicStatus, Teacher} from './entitiesClasses';
import { ApiMethods, EntityApi } from '../api/apiCalls';
import {AcademicStatusDTO, TeacherDTO} from "./entitiesDTO";
import {AllEntities, AllEntitiesNames, ConstructorFor, DtoOfEntity, EntitiesNamesToTypes} from "../common/types";

export abstract class EntityRelated<T extends AllEntities> {
  // name: string;

  // constructor(name = 'base class') {
  //   this.name = name;
  // }

  abstract api: ApiMethods<T>;
  abstract create(obj: ConstructorFor<T>): T;

  protected constructor() {
  }
}

export class AcademicStatusRelated extends EntityRelated<AcademicStatus>{
  // name: string;
  api: ApiMethods<AcademicStatus>;

  constructor() {
    super();
    this.api = new EntityApi<AcademicStatus>('academicStatus', this.create);
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

  constructor() {
    super();
    this.api = new EntityApi<Teacher>('teacher', this.create);
  }

  create(obj: TeacherDTO): Teacher {
    return new Teacher({...obj, academicStatus: new AcademicStatus(obj.academicStatus)});
  }
}

export const allEntitiesRelated: {[K in AllEntitiesNames]: EntityRelated<EntitiesNamesToTypes[K]>} = {
  academicStatus: new AcademicStatusRelated(),
  teacher: new TeacherRelated(),
}
