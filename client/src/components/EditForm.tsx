import React, { FormEvent, useState } from 'react';
import { ENTITY_TITLES } from '../common/constants';
import { ApiMethods } from '../api/apiCalls';
import {
  AllEntities,
  AllEntitiesItems,
  AllEntitiesNames, CreationTypeOf,
  DtoOfEntity,
} from '../common/types';
import { EntityRelated } from '../entities/entitiesRelated';
import NumberInput from './NumberInput';
import TextInput from './TextInput';
import DropdownInput from './DropdownInput';


interface Props<T extends AllEntities> {
  name: AllEntitiesNames
  fields: EntityRelated<T>['fields'],
  apiUpdateFunc: ApiMethods<T>['update'],
  allEntities: AllEntitiesItems,
  entity: DtoOfEntity<T>,
}

function EditForm<T extends AllEntities>({
                                             fields,
                                             apiUpdateFunc,
                                             name,
                                             allEntities,
  entity
                                           }: Props<T>): JSX.Element {
  const [values, setValues] = useState<DtoOfEntity<T>>(entity);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    apiUpdateFunc(values);
    event.preventDefault();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='fixed bg-white z-20 p-7 w-96 flex flex-col items-center gap-3 rounded-3xl drop-shadow-2xl left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2'>
      <h6 className='text-2xl font-semibold mb-3'>{ENTITY_TITLES[name]}</h6>
      {Object.keys(fields).map((fieldName) =>
        fields[fieldName as keyof typeof fields] === 'string' ?
          <TextInput
            key={fieldName}
            name={fieldName}
            value={values[fieldName as keyof typeof values] as unknown as string}
            onChange={(value) => setValues((vals) => {
              return { ...vals, [fieldName]: value };
            })}
          />
          : fields[fieldName as keyof typeof fields] === 'number' ?
            <NumberInput
              key={fieldName}
              name={fieldName}
              value={values[fieldName as keyof typeof values] as unknown as number}
              onChange={(value) => setValues((vals) => {
                return { ...vals, [fieldName]: value };
              })}
            />
            : fields[fieldName as keyof typeof fields] === 'entity' ?
              <DropdownInput
                key={fieldName}
                name={fieldName}
                value={values[fieldName as keyof typeof values]}
                onChange={(value) => setValues((vals) => {
                  return { ...vals, [fieldName]: value };
                })}
                items={allEntities[fieldName as keyof typeof allEntities]}
              />
              : null,
      )}
      <button type='submit'
              className='bg-blue-500 rounded-md py-1 mt-2 w-full drop-shadow-sm text-white font-bold text-lg'>
        Зберегти зміни
      </button>
    </form>
  );
}

export default EditForm;