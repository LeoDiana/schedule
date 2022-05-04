import { instance as axios } from "./axiosConfig";
import { AcademicStatus, AcademicStatusId } from "../interfaces/AcademicStatus";
import { Teacher } from "../interfaces/Teacher";

export const ERROR_MESSAGE = "Error occurred";
export const SUCCESS_MESSAGE = "Success";

export const ENDPOINTS = {
  academicStatus: "academic-statuses",
  teacher: "teachers",
};

export const readEntities = async (endpoint: string): Promise<any[]> => {
  try {
    const response = await axios.get(endpoint);
    return response.data as AcademicStatusId[];
  } catch (error) {
    return [];
  }
};

export const createEntityApi = async (
  entity: any,
  endpoint: string
): Promise<string> => {
  try {
    const response = await axios.post(endpoint, entity);
    return SUCCESS_MESSAGE;
  } catch (error) {
    console.log(error);
    return ERROR_MESSAGE;
  }
};

export const updateEntityApi = async (
  entity: any,
  endpoint: string
): Promise<string> => {
  try {
    const response = await axios.put(`${endpoint}/${entity.id}`, entity);
    return SUCCESS_MESSAGE;
  } catch (error) {
    console.log(error);
    return ERROR_MESSAGE;
  }
};

export const deleteEntityApi = async (
  id: string,
  endpoint: string
): Promise<string> => {
  try {
    const response = await axios.delete(`${endpoint}/${id}`);
    return SUCCESS_MESSAGE;
  } catch (error) {
    console.log(error);
    return ERROR_MESSAGE;
  }
};
