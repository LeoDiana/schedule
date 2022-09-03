import { instance as axios } from './axiosConfig';
import { AllEntities, AllEntitiesNames, DtoOfEntity } from '../common/types';

export type ApiMethods<T extends AllEntities> = {
  create: (obj: Omit<DtoOfEntity<T>, 'id'>) => Promise<void>;
  update: (obj: DtoOfEntity<T>) => Promise<void>;
  delete: (id: number) => void;
  readAll: () => Promise<T[]>;
};

export class EntityApi<T extends AllEntities> implements ApiMethods<T> {
  private convertEntityNameToEndpoint(name: AllEntitiesNames) {
    const ENDPOINTS: { [K in AllEntitiesNames]: string } = {
      academicStatus: 'academic-statuses',
      teacher: 'teachers',
      // subject: 'subjects',
      // lessonType: 'lesson-types',
      // lessonTime: 'lesson-times',
      // day: 'days',
      // weekType: 'week-types',
      // building: 'buildings',
      // classroom: 'classrooms',
      // subgroup: 'subgroups',
      // group: 'groups',
      // lesson: 'lessons',
    };

    return ENDPOINTS[name];
  }

  endpoint: string;
  generateObject: (obj: DtoOfEntity<T>) => T;

  constructor(name: AllEntitiesNames, generateObject: (obj: DtoOfEntity<T>) => T) {
    this.endpoint = this.convertEntityNameToEndpoint(name);
    this.generateObject = generateObject;
  }

  async create(entity: Omit<DtoOfEntity<T>, 'id'>): Promise<void> {
    try {
      await axios.post(this.endpoint, entity);
    } catch (error) {
      console.log(error);
    }
  }

  async update(entity: DtoOfEntity<T>): Promise<void> {
    try {
      await axios.put(`${this.endpoint}/${entity.id}`, entity);
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await axios.delete(`${this.endpoint}/${id}`);
    } catch (error) {
      console.log(error);
    }
  }

  async readAll(): Promise<T[]> {
    try {
      const response = await axios.get(this.endpoint);
      return (response.data as DtoOfEntity<T>[]).map(this.generateObject);
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
