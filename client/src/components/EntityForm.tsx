import React, { useState } from 'react';
import { ENTITY_TITLES } from '../common/constants';
import {
  AllEntities,
  AllEntitiesNames, CreationTypeOf,
  DtoOfEntity, EmptyEntityOf, EntitiesNamesToTypes,
} from '../common/types';
import { allEntitiesRelated, EntityRelated } from '../entities/entitiesRelated';
import NumberInput from './inputs/NumberInput';
import TextInput from './inputs/TextInput';
import DropdownInput from './inputs/DropdownInput';
import { useDispatch, useSelector } from 'react-redux';
import {
  createEntity,
  CreateEntityApi,
  selectAllEntities,
  updateEntity,
  UpdateEntityApi,
} from '../features/entities/entitiesSlice';
import Modal from './Modal';

interface BaseFormProps<T extends AllEntities> {
  name: AllEntitiesNames
  fields: EntityRelated<T>['fields'],
  formType: FormType,
}

interface UpdateFormProps<T extends AllEntities> extends BaseFormProps<T> {
  apiFunc: UpdateEntityApi,
  entity: DtoOfEntity<T>,
}

interface CreateFormProps<T extends AllEntities> extends BaseFormProps<T> {
  apiFunc: CreateEntityApi,
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
                                                                 formType,
                                                               }: EntityFormType<T, E>): JSX.Element {
  const dispatch = useDispatch();
  const allEntities = useSelector(selectAllEntities);

  const [values, setValues] = useState<CreationTypeOf<E> | DtoOfEntity<E>>(entity);
  const [showNotification, setShowNotification] = useState(false);

  async function handleSubmit(): Promise<void> {
    dispatch(apiFunc({ entityName: name, entity: values as any }));
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
      {showNotification ?? <SuccessfulNotification />}
      <form
        className='bg-white p-7 w-96 flex flex-col items-center gap-3 rounded-3xl drop-shadow-2xl'>
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

interface FormModalProps {
  onClose: () => void,
  entityType: AllEntitiesNames,
  entity: any
}

export function CreateModal({ onClose, entityType, entity }: FormModalProps) {
  return (
    <Modal close={onClose}>
      <EntityForm<'create', EntitiesNamesToTypes[typeof entityType]>
        apiFunc={createEntity}
        entity={entity}
        fields={allEntitiesRelated[entityType].fields}
        name={entityType}
        formType='create'
      />
    </Modal>
  );
}

export function EditModal({onClose, entityType, entity}: FormModalProps) {
  return (
    <Modal close={onClose}>
      <EntityForm<'update', EntitiesNamesToTypes[typeof entityType]>
        apiFunc={updateEntity}
        fields={allEntitiesRelated[entityType].fields}
        name={entityType}
        entity={entity}
        formType='update'
      />
    </Modal>
  );
}

export default EntityForm;

