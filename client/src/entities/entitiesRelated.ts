import { AcademicStatus, AcademicStatusDTO } from './entitiesClasses';
import { ApiMethods, EntityApi } from '../api/apiCalls';

// export abstract class EntityRelated {
//   name: string;
//
//   constructor(name = 'base class') {
//     this.name = name;
//   }
// }

// export class AcademicStatusRelated extends EntityRelated {
export class AcademicStatusRelated {
  // name: string;
  api: ApiMethods<AcademicStatus>;

  constructor() {
    this.api = new EntityApi<AcademicStatus>('academicStatus', this.create);
    // this.name = 'academicStatus';
    // super('academicStatus');
  }

  create(obj: AcademicStatusDTO) {
    return new AcademicStatus(obj);
  }
  // create(obj: AcademicStatusDTO | undefined = undefined) {
  //   return obj ? new AcademicStatus(obj) : new AcademicStatus();
  // }
}
