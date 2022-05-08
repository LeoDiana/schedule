import { createEntityApi, ENDPOINTS, readEntitiesApi, updateEntityApi } from '../api/apiCalls';
import CommonForm from './CommonForm';
import { AcademicStatus, Teacher } from '../types/types';

const academicStatusFormFields = {
  name: { label: 'Name', type: 'text' },
  shortName: { label: 'Short name', type: 'text' },
};

const academicStatusShortShownName = (obj: AcademicStatus) => {
  return `${obj.shortName}.`;
};

export const CreateAcademicStatusForm = () =>
  CommonForm({
    title: 'Create academic status',
    type: 'create',
    fields: academicStatusFormFields,
    apiCall: async (obj: AcademicStatus) => {
      const newAcademicStatus = {
        name: obj.name || '',
        shortName: obj.shortName || '',
      };
      return await createEntityApi(newAcademicStatus, ENDPOINTS.academicStatus);
    },
  });

export const UpdateAcademicStatusForm = (obj: AcademicStatus) =>
  CommonForm(
    {
      title: 'Update academic status',
      type: 'update',
      fields: academicStatusFormFields,
      apiCall: async (obj: AcademicStatus) => {
        const newAcademicStatus = {
          id: obj.id || '',
          name: obj.name || '',
          shortName: obj.shortName || '',
        };
        return await updateEntityApi(newAcademicStatus, ENDPOINTS.academicStatus);
      },
    },
    obj,
  );

const teacherFormFields = {
  firstName: { label: 'First name', type: 'text' },
  surname: { label: 'Surname', type: 'text' },
  patronymic: { label: 'Patronymic', type: 'text' },
  academicStatus: {
    label: 'Academic status',
    type: 'entity',
    getEntitiesForList: async () => {
      return await readEntitiesApi(ENDPOINTS.academicStatus);
    },
    makeShortShownName: academicStatusShortShownName,
  },
};

const teacherShortShownName = (obj: Teacher) => {
  return `${obj.surname} ${obj.firstName[0]}.${obj.patronymic[0]}.`;
};

export const CreateTeacherForm = () =>
  CommonForm({
    title: 'Create teacher',
    type: 'create',
    fields: teacherFormFields,
    apiCall: async (obj: Teacher) => {
      const newTeacher = {
        firstName: obj.firstName || '',
        surname: obj.surname || '',
        patronymic: obj.patronymic || '',
        academicStatus: obj.academicStatus || ({} as AcademicStatus),
      };
      return await createEntityApi(newTeacher, ENDPOINTS.teacher);
    },
  });

export const UpdateTeacherForm = () =>
  CommonForm({
    title: 'Update teacher',
    type: 'update',
    fields: teacherFormFields,
    apiCall: async (obj: Teacher) => {
      const newTeacher = {
        id: obj.id || '',
        firstName: obj.firstName || '',
        surname: obj.surname || '',
        patronymic: obj.patronymic || '',
        academicStatus: obj.academicStatus || ({} as AcademicStatus),
      };
      return await createEntityApi(newTeacher, ENDPOINTS.teacher);
    },
  });
