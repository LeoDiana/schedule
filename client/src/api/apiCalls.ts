import { instance as axios } from './axiosConfig';
import { AllEntities, AllEntitiesNames } from '../common/types';

type ApiMethods<T extends AllEntities> = {
  create: (obj: T) => Promise<void>;
  update: (obj: T) => Promise<void>;
  delete: (id: number) => void;
  readAll: () => Promise<T[]>;
};

export class EntityApi<T extends AllEntities> implements ApiMethods<T> {
  private convertEntityNameToEndpoint(name: AllEntitiesNames) {
    const ENDPOINTS: { [K in AllEntitiesNames]: string } = {
      academicStatus: 'academic-statuses',
      // teacher: 'teachers',
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

  constructor(name: AllEntitiesNames) {
    this.endpoint = this.convertEntityNameToEndpoint(name);
  }

  async create(entity: T): Promise<void> {
    try {
      await axios.post(this.endpoint, entity);
    } catch (error) {
      console.log(error);
    }
  }

  async update(entity: T): Promise<void> {
    try {
      if (entity.id === undefined) {
        throw new Error('Entity should have id in order to be updated');
      }
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
      return response.data as T[];
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
