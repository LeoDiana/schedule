import { instance as axios } from "./axiosConfig";
import { AcademicStatus, AcademicStatusId } from "../interfaces/AcademicStatus";

export const ERROR_MESSAGE = "Error occurred";
export const SUCCESS_MESSAGE = "Success";

export const readAllAcademicStatuses = async (): Promise<
  AcademicStatusId[]
> => {
  try {
    const response = await axios.get("academic-statuses");
    return response.data;
  } catch (error) {
    return [];
  }
};

export const createAcademicStatus = async (
  academicStatus: AcademicStatus
): Promise<string> => {
  try {
    console.log(process.env.REACT_APP_API_URL);
    const response = await axios.post("academic-status", academicStatus);
    return SUCCESS_MESSAGE;
  } catch (error) {
    console.log(error);
    return ERROR_MESSAGE;
  }
};
