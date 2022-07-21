import { instance as axios } from './axiosConfig';
import { ENDPOINTS, ERROR_MESSAGE, SUCCESS_MESSAGE } from '../common/constants';

export const readEntitiesApi = async (endpoint: string): Promise<any[]> => {
  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    return [];
  }
};

export const createEntityApi = async (entity: any, endpoint: string): Promise<string> => {
  try {
    const response = await axios.post(endpoint, entity);
    return SUCCESS_MESSAGE;
  } catch (error) {
    console.log(error);
    return ERROR_MESSAGE;
  }
};

export const updateEntityApi = async (entity: any, endpoint: string): Promise<string> => {
  try {
    const response = await axios.put(`${endpoint}/${entity.id}`, entity);
    return SUCCESS_MESSAGE;
  } catch (error) {
    console.log(error);
    return ERROR_MESSAGE;
  }
};

export const deleteEntityApi = async (id: string, endpoint: string): Promise<string> => {
  try {
    const response = await axios.delete(`${endpoint}/${id}`);
    return SUCCESS_MESSAGE;
  } catch (error) {
    console.log(error);
    return ERROR_MESSAGE;
  }
};

export const readLessonsWithFilter = async (id: string, filter: string): Promise<any[]> => {
  try {
    const response = await axios.get(`${ENDPOINTS.lesson}/${filter}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
