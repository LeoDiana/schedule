import React, {FormEvent, useState} from "react";
import {ENTITY_TITLES, FIELD_TITLES} from "../common/constants";
import {ApiMethods} from "../api/apiCalls";
import {AcademicStatus} from "../entities/entitiesClasses";
import {AllEntities, AllEntitiesNames, DtoOfEntity, Optional, ValuesTypeInCreateForm} from "../common/types";
import {allEntitiesRelated, EntityRelated} from "../entities/entitiesRelated";
import {AcademicStatusDTO} from "../entities/entitiesDTO";
import {ChevronDownIcon} from "@heroicons/react/24/outline";
import {useModal} from "../common/hooks";

interface TextInputProps {
  name: string,
  value: string,
  onChange: (value: string) => void,
}

function TextInput({name, value, onChange}: TextInputProps): JSX.Element {
  return (
    <div className='w-full flex flex-col'>
      <label htmlFor={name} className='font-medium mb-0.5'>{FIELD_TITLES[name as keyof typeof FIELD_TITLES]}</label>
      <input id={name} type='text' onChange={(event) => onChange(event.target.value)} required value={value}
             className='rounded-md border-2 drop-shadow-sm text-lg px-2 py-1'/>
    </div>
  )
}


interface NumberInputProps {
  name: string,
  value: number,
  onChange: (value: number) => void,
}

function NumberInput({name, value, onChange}: NumberInputProps): JSX.Element {
  return (
    <div className='w-full flex flex-col'>
      <label htmlFor={name} className='font-medium mb-0.5'>{FIELD_TITLES[name as keyof typeof FIELD_TITLES]}</label>
      <input id={name} type='number' onChange={(event) => onChange(Number(event.target.value))} required value={value}
             className='rounded-md border-2 drop-shadow-sm text-lg px-2 py-1'/>
    </div>
  )
}


interface DropdownInputProps {
  name: string,
  value: number,
  onChange: (value: number) => void,
  items: Array<any>;
}

function DropdownInput({name, value, onChange, items}: DropdownInputProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='w-full flex flex-col'>
      <label htmlFor={name} className='font-medium mb-0.5'>{FIELD_TITLES[name as keyof typeof FIELD_TITLES]}</label>
      <div className='w-full relative'>
        <input id={name} type='number' onChange={(event) => onChange(Number(event.target.value))} required value={value}
               className='w-full rounded-md border-2 drop-shadow-sm text-lg pl-2 pr-9 py-1'/>
        <ChevronDownIcon onClick={() => setIsOpen(s => !s)} className='w-6 absolute right-2 top-1/2 -translate-y-1/2 stroke-2 text-gray-500'/>
      </div>
<div className='relative'>
      {isOpen ?
      <div className='w-full bg-white drop-shadow-sm rounded-md py-1 border-2 text-lg gap-2 absolute z-30 top-0 mt-1'>
        {items.map((item: any) =>
          <div
            key={JSON.stringify(item)}
            className='hover:bg-gray-100 px-2'
          >
            {item}
          </div>
        )}
      </div>
        : null
      }
</div>
    </div>
  )
}


interface Props<T extends AllEntities> {
  name: AllEntitiesNames
  fields: EntityRelated<T>['fields'],
  apiCreateFunc: ApiMethods<T>['create'],
  createEmptyEntity: () => ValuesTypeInCreateForm<T>,
}

function CreateForm<T extends AllEntities>({fields, apiCreateFunc, createEmptyEntity, name}: Props<T>): JSX.Element {
  const [values, setValues] = useState<ValuesTypeInCreateForm<T>>(createEmptyEntity());

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    console.log('SEND');
    console.log(values);
    event.preventDefault();
    // apiCreateFunc(values);
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
              return {...vals, [fieldName]: value}
            })}
          />
          : fields[fieldName as keyof typeof fields] === 'number' ?
            <NumberInput
              key={fieldName}
              name={fieldName}
              value={values[fieldName as keyof typeof values] as unknown as number}
              onChange={(value) => setValues((vals) => {
                return {...vals, [fieldName]: value}
              })}
            />
            : fields[fieldName as keyof typeof fields] === 'entity' ?
              <DropdownInput
                key={fieldName}
                name={fieldName}
                value={values[fieldName as keyof typeof values] as unknown as number}
                onChange={(value) => setValues((vals) => {
                  return {...vals, [fieldName]: value}
                })}
                items={['blah 1', 'blah 2', 'blah 3']}
              />
              : null
      )}
      <button type='submit'
              className='bg-blue-500 rounded-md py-1 mt-2 w-full drop-shadow-sm text-white font-bold text-lg'>Створити
      </button>
    </form>
  )
}

export default CreateForm;