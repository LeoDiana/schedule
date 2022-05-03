import { instance as axios } from "./axiosConfig";
import { AcademicStatus, AcademicStatusId } from "../interfaces/AcademicStatus";
import { Teacher } from "../interfaces/Teacher";

export const ERROR_MESSAGE = "Error occurred";
export const SUCCESS_MESSAGE = "Success";

export const readAllAcademicStatuses = async (): Promise<AcademicStatus[]> => {
  try {
    const response = await axios.get("academic-status");
    return response.data as AcademicStatusId[];
  } catch (error) {
    return [];
  }
};

export const createAcademicStatus = async (
  academicStatus: AcademicStatus
): Promise<string> => {
  try {
    const response = await axios.post("academic-status", academicStatus);
    return SUCCESS_MESSAGE;
  } catch (error) {
    console.log(error);
    return ERROR_MESSAGE;
  }
};

export const createTeacher = async (teacher: Teacher): Promise<string> => {
  try {
    const response = await axios.post("teachers", teacher);
    return SUCCESS_MESSAGE;
  } catch (error) {
    console.log(error);
    return ERROR_MESSAGE;
  }
};
