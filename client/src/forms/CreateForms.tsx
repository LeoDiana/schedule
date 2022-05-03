import CreateOnlyTextEntityForm from "./CreateOnlyTextEntityForm";
import {
  createAcademicStatus,
  createTeacher,
  readAllAcademicStatuses,
} from "../api/apiCalls";
import { AcademicStatus, AcademicStatusId } from "../interfaces/AcademicStatus";
import CommonForm from "./CommonForm";
import { Teacher } from "../interfaces/Teacher";

export const CreateAcademicStatusForm = () =>
  CommonForm({
    title: "Create academic status",
    type: "create",
    fields: {
      name: { label: "Name", type: "text" },
      shortName: { label: "Short name", type: "text" },
    },
    apiCall: async (obj: AcademicStatus) => {
      const newAcademicStatus = {
        name: obj.name || "",
        shortName: obj.shortName || "",
      };
      return await createAcademicStatus(newAcademicStatus);
    },
  });

export const CreateTeacherForm = () =>
  CommonForm({
    title: "Create teacher",
    type: "create",
    fields: {
      firstName: { label: "First name", type: "text" },
      surname: { label: "Surname", type: "text" },
      patronymic: { label: "Patronymic", type: "text" },
      academicStatus: {
        label: "Academic status",
        type: "entity",
        getEntitiesForList: async () => {
          return await readAllAcademicStatuses();
        },
        makeShortShownName: (obj: AcademicStatus) => {
          // @ts-ignore
          return `${obj.shortName}.`;
        },
      },
    },
    apiCall: async (obj: Teacher) => {
      const newTeacher = {
        firstName: obj.firstName || "",
        surname: obj.surname || "",
        patronymic: obj.patronymic || "",
        academicStatus: obj.academicStatus || ({} as AcademicStatusId),
      };
      return await createTeacher(newTeacher);
    },
  });

/*
makeShortShownName: (obj: Teacher) => {
          console.log(obj);
          // @ts-ignore
          return `${obj.surname} ${obj.firstName[0]}.${obj.patronymic[0]}.`;
        },
* */
