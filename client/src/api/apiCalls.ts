import { instance as axios } from './axiosConfig';
import { AllEntities, AllEntitiesNames, DtoOfEntity } from '../common/types';
import { allEntitiesRelated } from '../entities/entitiesRelated';

const ENDPOINTS: { [K in AllEntitiesNames]: string } = {
  academicStatus: 'academic-statuses',
  teacher: 'teachers',
  lessonTime: 'lesson-times',
  day: 'days',
  lessonType: 'lesson-types',
  subject: 'subjects',
  weekType: 'week-types',
  subgroup: 'subgroups',
  group: 'groups',
  building: 'buildings',
  classroom: 'classrooms',
  lesson: 'lessons',
};

export type ApiMethods<T extends AllEntities> = {
  create: (obj: Omit<DtoOfEntity<T>, 'id'>) => Promise<any>;
  update: (obj: DtoOfEntity<T>) => Promise<any>;
  delete: (id: number) => void;
  readAll: () => Promise<T[]>;
};

export class EntityApi<T extends AllEntities> implements ApiMethods<T> {
  private convertEntityNameToEndpoint(name: AllEntitiesNames) {
    return ENDPOINTS[name];
  }

  endpoint: string;
  generateObject: (obj: DtoOfEntity<T>) => T;

  constructor(name: AllEntitiesNames, generateObject: (obj: DtoOfEntity<T>) => T) {
    this.endpoint = this.convertEntityNameToEndpoint(name);
    this.generateObject = generateObject;
  }

  async create(entity: Omit<DtoOfEntity<T>, 'id'>): Promise<any> {
    try {
      return await axios.post(this.endpoint, entity);
    } catch (error) {
      console.log(error);
    }
  }

  async update(entity: DtoOfEntity<T>): Promise<any> {
    try {
      return await axios.put(`${this.endpoint}/${entity.id}`, entity);
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

export const readLessonsWithFilter = async (id: number, filter: string): Promise<any[]> => {
  try {
    const response = await axios.get(`${ENDPOINTS.lesson}/${filter}/${id}`);
    return (response.data).map(allEntitiesRelated.lesson.create);
  } catch (error) {
    console.log(error);
    return [];
  }
};
