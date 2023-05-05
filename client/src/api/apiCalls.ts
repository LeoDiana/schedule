import { instance as axios } from './axiosConfig';
import { AllEntities, AllEntitiesNames, DtoOfEntity } from '../common/types';
import { ID, LessonDTO } from '../entities/entitiesDTO';

const ENDPOINTS: { [K in AllEntitiesNames]: string } = {
  academicStatus: 'academic-statuses',
  teacher: 'teachers',
  lessonTime: 'lesson-times',
  day: 'days',
  lessonType: 'lesson-types',
  subject: 'subjects',
  weekType: 'week-types',
  subgroup: 'subgroups',
  building: 'buildings',
  classroom: 'classrooms',
  lesson: 'lessons',
};

export type ApiMethods<T extends AllEntities> = {
  create: (obj: Omit<DtoOfEntity<T>, 'id'>) => Promise<any>;
  update: (obj: DtoOfEntity<T>) => Promise<any>;
  delete: (id: ID) => void;
  readAll: () => Promise<DtoOfEntity<T>[]>;
};

export class EntityApi<T extends AllEntities> implements ApiMethods<T> {
  private convertEntityNameToEndpoint(name: AllEntitiesNames) {
    return ENDPOINTS[name];
  }

  endpoint: string;

  constructor(name: AllEntitiesNames) {
    this.endpoint = this.convertEntityNameToEndpoint(name);
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

  async delete(id: ID): Promise<void> {
    try {
      await axios.delete(`${this.endpoint}/${id}`);
    } catch (error) {
      console.log(error);
    }
  }

  async readAll(): Promise<DtoOfEntity<T>[]> {
    try {
      const response = await axios.get(this.endpoint);
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}

export const readLessonsWithFilter = async (id: number, filter: string): Promise<LessonDTO[]> => {
  try {
    const response = await axios.get(`${ENDPOINTS.lesson}/${filter}/${id}`);
    return (response.data);
  } catch (error) {
    console.log(error);
    return [];
  }
};
