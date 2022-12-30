import React, { useState } from 'react';
import { ENTITY_TITLES } from '../common/constants';
import { ApiMethods } from '../api/apiCalls';
import {
  AllEntities,
  AllEntitiesItems,
  AllEntitiesNames, CreationTypeOf,
  DtoOfEntity, EmptyEntityOf,
} from '../common/types';
import { EntityRelated } from '../entities/entitiesRelated';
import NumberInput from './inputs/NumberInput';
import TextInput from './inputs/TextInput';
import DropdownInput from './inputs/DropdownInput';

interface BaseFormProps<T extends AllEntities> {
  name: AllEntitiesNames
  fields: EntityRelated<T>['fields'],
  allEntities: AllEntitiesItems,
  formType: FormType,
  returns?: (obj: DtoOfEntity<T>) => void
}

interface UpdateFormProps<T extends AllEntities> extends BaseFormProps<T> {
  apiFunc: ApiMethods<T>['update'],
  entity: DtoOfEntity<T>,
}

interface CreateFormProps<T extends AllEntities> extends BaseFormProps<T> {
  apiFunc: ApiMethods<T>['create'],
  entity: EmptyEntityOf<T>,
}

type FormType = 'update' | 'create';

type EntityFormType<T extends FormType, E extends AllEntities> = T extends 'create' ?
  CreateFormProps<E> : UpdateFormProps<E>

function EntityForm<T extends FormType, E extends AllEntities>({
                                                                 fields,
                                                                 apiFunc,
                                                                 entity,
                                                                 name,
                                                                 allEntities,
                                                                 formType,
                                                                 returns,
                                                               }: EntityFormType<T, E>): JSX.Element {
  const [values, setValues] = useState<CreationTypeOf<E> | DtoOfEntity<E>>(entity);
  const [showNotification, setShowNotification] = useState(false);

  async function handleSubmit(): Promise<void> {
    const result = await apiFunc(values as any);
    if (returns) {
      returns(result as any);
    }
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3 * 1000);
  }

  const renderInput = (fieldName: string) => {
    switch (fields[fieldName as keyof typeof fields]) {
      case 'string':
        return <TextInput
          key={fieldName}
          name={fieldName}
          value={values[fieldName as keyof typeof values] as unknown as string}
          onChange={(value) => setValues((vals) => {
            return { ...vals, [fieldName]: value };
          })}
        />;
      case 'number':
        return <NumberInput
          key={fieldName}
          name={fieldName}
          value={values[fieldName as keyof typeof values] as unknown as number}
          onChange={(value) => setValues((vals) => {
            return { ...vals, [fieldName]: value };
          })}
        />;
      case 'entity':
        return <DropdownInput
          key={fieldName}
          name={fieldName}
          value={values[fieldName as keyof typeof values]}
          onChange={(value) => setValues((vals) => {
            return { ...vals, [fieldName]: value };
          })}
          items={allEntities[fieldName as keyof typeof allEntities]}
        />;
      default:
        return null;
    }
  };

  return (
    <>
      {showNotification ? <SuccessfulNotification /> : null}
      <form
        className='fixed bg-white z-20 p-7 w-96 flex flex-col items-center gap-3 rounded-3xl drop-shadow-2xl left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2'>
        <h6 className='text-2xl font-semibold mb-3'>{ENTITY_TITLES[name]}</h6>
        {Object.keys(fields).map((fieldName) => renderInput(fieldName))}
        <button type='button'
                className='bg-blue-500 rounded-md py-1 mt-2 w-full drop-shadow-sm text-white font-bold text-lg'
                onClick={handleSubmit}
        >
          {formType === 'create' ? 'Створити' : 'Зберегти зміни'}
        </button>
      </form>
    </>
  );
}

function SuccessfulNotification(): JSX.Element {
  return (
    <div
      className='bg-green-500 font-bold fixed z-50 left-1/2 -translate-x-1/2 bottom-10 rounded-lg py-2 px-6 drop-shadow-md'>
      Entity created/edited
    </div>
  );
}

export default EntityForm;