import {
  ENDPOINTS,
  createEntityApi,
  deleteEntityApi,
  readEntitiesApi,
  updateEntityApi,
} from '../api/apiCalls';
import { ENTITY_SHOWN_NAMES, generateCommonFormFor } from './generateCommomFormFor';
import {
  AllEntities,
  AllEntitiesOfType,
  ApiEndpoints,
  EntityInfoFieldComplex,
  EntityInfoFields,
  FieldsOfType,
} from './types';

const generateApiCallsObjectFor = (endpoint: string): ApiEndpoints => {
  return {
    readAll: () => readEntitiesApi(endpoint),
    create: (obj: any) => createEntityApi(obj, endpoint),
    update: (obj: any) => updateEntityApi(obj, endpoint),
    delete: (id: string) => deleteEntityApi(id, endpoint),
  };
};

export interface EntityInfoInterface<T extends AllEntities> {
  name: string;
  fields: EntityInfoFields<T>;
  shortShownName: (obj: any) => string;
  api: ApiEndpoints;
  CreateForm: any;
  UpdateForm: any;
}

class EntityInfo<T extends AllEntities> implements EntityInfoInterface<T> {
  name: string;
  fields: EntityInfoFields<T>;
  shortShownName: (obj: any) => string;
  api: ApiEndpoints;
  CreateForm: any;
  UpdateForm: any;

  constructor(
    name: AllEntities,
    fields: EntityInfoFields<T>,
    shortShownName: (obj: any) => string,
  ) {
    this.name = name;
    this.fields = fields;
    this.shortShownName = shortShownName;

    this.api = generateApiCallsObjectFor(ENDPOINTS[name]);
    this.CreateForm = generateCommonFormFor('create', this);
    this.UpdateForm = generateCommonFormFor('update', this);
  }
}

const createAllEntities = (): AllEntitiesOfType<EntityInfoInterface<AllEntities>> => {
  type lvl0DependencyEntitiesNames =
    | 'academicStatus'
    | 'subject'
    | 'lessonType'
    | 'lessonTime'
    | 'day'
    | 'weekType'
    | 'building'
    | 'group';
  type lvl1DependencyEntitiesNames = 'teacher' | 'classroom' | 'subgroup';
  type lvl2DependencyEntitiesNames = 'lesson';

  const lvl0DependencyEntities: { [K in lvl0DependencyEntitiesNames]: EntityInfoInterface<any> } = {
    academicStatus: new EntityInfo<'academicStatus'>(
      'academicStatus',
      {
        name: { label: 'Name', type: 'text' },
        shortName: { label: 'Short name', type: 'text' },
      },
      (obj) => {
        return `${obj.shortName}.`;
      },
    ),
    subject: new EntityInfo<'subject'>(
      'subject',
      {
        name: { label: 'Name', type: 'text' },
        shortName: { label: 'Short name', type: 'text' },
      },
      (obj) => {
        return `${obj.shortName}`;
      },
    ),
    lessonType: new EntityInfo<'lessonType'>(
      'lessonType',
      {
        name: { label: 'Name', type: 'text' },
        shortName: { label: 'Short name', type: 'text' },
      },
      (obj) => {
        return `${obj.shortName}.`;
      },
    ),
    lessonTime: new EntityInfo<'lessonTime'>(
      'lessonTime',
      {
        number: { label: 'Number', type: 'text' },
        timeStart: { label: 'Time start', type: 'text' },
        timeEnd: { label: 'Time end', type: 'text' },
      },
      (obj) => {
        return `${obj.number} ${obj.timeStart}`;
      },
    ),
    day: new EntityInfo<'day'>(
      'day',
      {
        name: { label: 'Name', type: 'text' },
      },
      (obj) => {
        return `${obj.name}`;
      },
    ),
    weekType: new EntityInfo<'weekType'>(
      'weekType',
      {
        name: { label: 'Name', type: 'text' },
      },
      (obj) => {
        return `${obj.name}`;
      },
    ),
    building: new EntityInfo<'building'>(
      'building',
      {
        name: { label: 'Name', type: 'text' },
        address: { label: 'Address', type: 'text' },
      },
      (obj) => {
        return `${obj.name}`;
      },
    ),
    group: new EntityInfo<'group'>(
      'group',
      {
        name: { label: 'Name', type: 'text' },
        startYear: { label: 'Start year', type: 'number' },
      },
      (obj) => {
        return `${obj.name}`;
      },
    ),
  };

  const createFieldOfEntityTypeLvl1 = (
    label: lvl0DependencyEntitiesNames,
  ): EntityInfoFieldComplex => {
    return {
      label: ENTITY_SHOWN_NAMES[label],
      type: 'entity',
      getEntitiesForList: lvl0DependencyEntities[label].api.readAll,
      makeShortShownName: (obj) => lvl0DependencyEntities[label].shortShownName(obj),
    };
  };

  const lvl1DependencyEntities: { [K in lvl1DependencyEntitiesNames]: EntityInfoInterface<any> } = {
    teacher: new EntityInfo<'teacher'>(
      'teacher',
      {
        surname: { label: 'Surname', type: 'text' },
        firstName: { label: 'First name', type: 'text' },
        patronymic: { label: 'Patronymic', type: 'text' },
        academicStatus: createFieldOfEntityTypeLvl1('academicStatus'),
      },
      (obj) => {
        return `${obj.surname} ${obj.firstName[0]}.${obj.patronymic[0]}.`;
      },
    ),
    classroom: new EntityInfo<'classroom'>(
      'classroom',
      {
        number: { label: 'Number', type: 'text' },
        capacity: { label: 'Capacity', type: 'number' },
        building: createFieldOfEntityTypeLvl1('building'),
      },
      (obj) => {
        return `${obj.number} ${commonEntitiesInfo['building'].shortShownName(obj.building)}`;
      },
    ),
    subgroup: new EntityInfo<'subgroup'>(
      'subgroup',
      {
        name: { label: 'Name', type: 'text' },
        studentsNumber: { label: 'Students number', type: 'number' },
        group: createFieldOfEntityTypeLvl1('group'),
      },
      (obj) => {
        if (obj.group.name === obj.name) {
          return `${obj.name}`;
        }
        return `${obj.group.name} ${obj.name}`;
      },
    ),
  };

  const createFieldOfEntityTypeLvl2 = (
    label: lvl0DependencyEntitiesNames | lvl1DependencyEntitiesNames,
  ): EntityInfoFieldComplex => {
    const availableEntities = { ...lvl0DependencyEntities, ...lvl1DependencyEntities };
    return {
      label: ENTITY_SHOWN_NAMES[label],
      type: 'entity',
      getEntitiesForList: availableEntities[label].api.readAll,
      makeShortShownName: (obj) => availableEntities[label].shortShownName(obj),
    };
  };

  const lvl2DependencyEntities: { [K in lvl2DependencyEntitiesNames]: EntityInfoInterface<any> } = {
    lesson: new EntityInfo<'lesson'>(
      'lesson',
      {
        teacher: createFieldOfEntityTypeLvl2('teacher'),
        subject: createFieldOfEntityTypeLvl2('subject'),
        lessonType: createFieldOfEntityTypeLvl2('lessonType'),
        lessonTime: createFieldOfEntityTypeLvl2('lessonTime'),
        classroom: createFieldOfEntityTypeLvl2('classroom'),
        day: createFieldOfEntityTypeLvl2('day'),
        weekType: createFieldOfEntityTypeLvl2('weekType'),
        subgroup: createFieldOfEntityTypeLvl2('subgroup'),
      },
      (obj) => {
        return `Lesson`; // TODO
      },
    ),
  };

  return {
    ...lvl0DependencyEntities,
    ...lvl1DependencyEntities,
    ...lvl2DependencyEntities,
  } as const;
};

export function createEmptyEntity<T extends AllEntities>(
  typeOfEntity: AllEntities,
): FieldsOfType<AllEntities> {
  switch (typeOfEntity) {
    case 'academicStatus':
      return {
        name: '',
        shortName: '',
      };
    case 'subject':
      return {
        name: '',
        shortName: '',
      };

    case 'lessonType':
      return {
        name: '',
        shortName: '',
      };
    case 'lessonTime':
      return {
        number: '',
        timeStart: '',
        timeEnd: '',
      };
    case 'day':
      return {
        name: '',
      } as FieldsOfType<'day'>;
    case 'weekType':
      return {
        name: '',
      };
    case 'building':
      return {
        name: '',
        address: '',
      };
    case 'group':
      return {
        name: '',
        startYear: 0,
      };
    case 'teacher':
      return {
        firstName: '',
        surname: '',
        patronymic: '',
        academicStatus: {
          name: '',
          shortName: '',
        },
      };
    case 'classroom':
      return {
        number: '',
        capacity: 0,
        building: {
          name: '',
          address: '',
        },
      };
    case 'subgroup':
      return {
        name: '',
        studentsNumber: 0,
        group: {
          name: '',
          startYear: 0,
        },
      };
    case 'lesson':
      return {
        teacher: {
          firstName: '',
          surname: '',
          patronymic: '',
          academicStatus: {
            name: '',
            shortName: '',
          },
        },
        subject: {
          name: '',
          shortName: '',
        },
        lessonType: {
          name: '',
          shortName: '',
        },
        lessonTime: {
          number: '',
          timeStart: '',
          timeEnd: '',
        },
        classroom: {
          number: '',
          capacity: 0,
          building: {
            name: '',
            address: '',
          },
        },
        day: {
          name: '',
        },
        weekType: {
          name: '',
        },
        subgroup: {
          name: '',
          group: {
            name: '',
            startYear: 0,
          },
          studentsNumber: 0,
        },
      };
    default: {
      return typeOfEntity as never;
    }
  }
}

export const commonEntitiesInfo: AllEntitiesOfType<EntityInfoInterface<AllEntities>> =
  createAllEntities();
