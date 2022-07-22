import {
  createEntityApi,
  deleteEntityApi,
  readEntitiesApi,
  updateEntityApi,
} from '../api/apiCalls';
import { generateCommonFormFor } from './generateCommomFormFor';
import {
  AllEntities,
  AllEntitiesOfType,
  ApiEndpoints,
  EntityInfoFieldComplex,
  EntityInfoFields,
  FieldsOfType,
  SimpleFieldsOfType,
} from './types';
import { ENDPOINTS, ENTITY_SHOWN_NAMES } from './constants';

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

  generateApiCallsObjectFor = (endpoint: string): ApiEndpoints => {
    return {
      readAll: () => readEntitiesApi(endpoint),
      create: (obj: any) => createEntityApi(obj, endpoint),
      update: (obj: any) => updateEntityApi(obj, endpoint),
      delete: (id: string) => deleteEntityApi(id, endpoint),
    };
  };

  constructor(
    name: AllEntities,
    fields: EntityInfoFields<T>,
    shortShownName: (obj: any) => string,
  ) {
    this.name = name;
    this.fields = fields;
    this.shortShownName = shortShownName;

    this.api = this.generateApiCallsObjectFor(ENDPOINTS[name]);
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
): SimpleFieldsOfType<AllEntities> {
  switch (typeOfEntity) {
    case 'academicStatus':
      return {
        name: '',
        shortName: '',
      } as SimpleFieldsOfType<'academicStatus'>;
    case 'subject':
      return {
        name: '',
        shortName: '',
      } as SimpleFieldsOfType<'subject'>;
    case 'lessonType':
      return {
        name: '',
        shortName: '',
      } as SimpleFieldsOfType<'lessonType'>;
    case 'lessonTime':
      return {
        number: '',
        timeStart: '',
        timeEnd: '',
      } as SimpleFieldsOfType<'lessonTime'>;
    case 'day':
      return {
        name: '',
      } as SimpleFieldsOfType<'day'>;
    case 'weekType':
      return {
        name: '',
      } as SimpleFieldsOfType<'weekType'>;
    case 'building':
      return {
        name: '',
        address: '',
      } as SimpleFieldsOfType<'building'>;
    case 'group':
      return {
        name: '',
        startYear: 0,
      } as SimpleFieldsOfType<'group'>;
    case 'teacher':
      return {
        firstName: '',
        surname: '',
        patronymic: '',
        academicStatus: 0,
      } as SimpleFieldsOfType<'teacher'>;
    case 'classroom':
      return {
        number: '',
        capacity: 0,
        building: 0,
      } as SimpleFieldsOfType<'classroom'>;
    case 'subgroup':
      return {
        name: '',
        studentsNumber: 0,
        group: 0,
      } as SimpleFieldsOfType<'subgroup'>;
    case 'lesson':
      return {
        teacher: 0,
        subject: 0,
        lessonType: 0,
        lessonTime: 0,
        classroom: 0,
        day: 0,
        weekType: 0,
        subgroup: 0,
      } as SimpleFieldsOfType<'lesson'>;
    default: {
      return typeOfEntity as never;
    }
  }
}

/**
 * Change passed object fields of object type to id of corresponding object
 *
 * @param {FieldsOfType<AllEntities>} obj - entity object
 * @return {SimpleFieldsOfType<AllEntities>} transformed object
 */
export function simplifyEntityFields(
  obj: FieldsOfType<AllEntities> | undefined,
): SimpleFieldsOfType<AllEntities> | undefined {
  if (!obj) {
    return obj;
  }
  const newObj: SimpleFieldsOfType<AllEntities> = { ...obj };
  let fieldName: keyof typeof obj;
  for (fieldName in obj) {
    if (typeof obj[fieldName] === 'object') {
      const entity: { id: number } = obj[fieldName] as unknown as { id: number };
      newObj[fieldName] = entity.id || 0;
    }
  }
  return newObj;
}

export const commonEntitiesInfo: AllEntitiesOfType<EntityInfoInterface<AllEntities>> =
  createAllEntities();
