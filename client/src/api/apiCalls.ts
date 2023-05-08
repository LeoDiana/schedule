import { instance as axios } from './axiosConfig';
import {
  AllEntities,
  AllEntitiesNames,
} from '../common/types';
import { ID } from '../entities/entitiesDTO';

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
  create: (obj: Omit<T, 'id'>) => Promise<any>;
  update: (obj: T) => Promise<any>;
  delete: (id: ID) => void;
  readAll: () => Promise<T[]>;
};


export function createEntityApi<T extends AllEntities>(entityName: AllEntitiesNames): ApiMethods<T> {
  const endpoint = ENDPOINTS[entityName];

  async function create(entity: Omit<T, 'id'>): Promise<any> {
    try {
      return await axios.post(endpoint, entity);
    } catch (error) {
      console.log(error);
    }
  }

  async function update(entity: T): Promise<any> {
    try {
      return await axios.put(`${endpoint}/${entity.id}`, entity);
    } catch (error) {
      console.log(error);
    }
  }

  async function remove(id: ID): Promise<void> {
    try {
      await axios.delete(`${endpoint}/${id}`);
    } catch (error) {
      console.log(error);
    }
  }

  async function readAll(): Promise<T[]> {
    try {
      const response = await axios.get(endpoint);
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  return {
    create,
    update,
    delete: remove,
    readAll
  }
}
