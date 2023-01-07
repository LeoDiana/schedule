import React, { useState } from 'react';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { allEntitiesRelated, getDisplayName } from '../entities/entitiesRelated';
import { ENTITY_TITLES, FIELD_TITLES } from '../common/constants';
import {
  AllEntitiesNames,
  EntitiesNamesToTypes,
} from '../common/types';
import { useModal } from '../common/hooks';
import EntityForm from '../components/EntityForm';
import Modal from '../components/Modal';
import {
  createEntity,
  deleteEntity,
  selectAllEntities,
  updateEntity,
} from '../features/entities/entitiesSlice';
import { useDispatch, useSelector } from 'react-redux';

function AdminPanel(): JSX.Element {
  const dispatch = useDispatch();
  const entities = useSelector(selectAllEntities);

  const [selectedEntityType, setSelectedEntityType] = useState<AllEntitiesNames>('academicStatus');
  const [isCreateFormOpen, openCreateForm, closeCreateForm] = useModal();
  const [isEditFormOpen, openEditForm, closeEditForm] = useModal();
  const [selectedEntityId, setSelectedEntityId] = useState<number>();

  function onEntityTypeClick(entity: AllEntitiesNames) {
    return () => {
      setSelectedEntityType(entity);
    };
  }

  function handleDelete(id: number) {
    dispatch(deleteEntity({ entityName: selectedEntityType, id }));
  }

  function fieldsCount(ent: AllEntitiesNames) {
    return Object.keys(allEntitiesRelated[ent].fields).length + 2;
  }

  return (
    <>
      {isCreateFormOpen &&
        <Modal close={closeCreateForm}>
          <EntityForm<'create', EntitiesNamesToTypes[typeof selectedEntityType]>
            apiFunc={createEntity}
            entity={allEntitiesRelated[selectedEntityType].createEmpty()}
            fields={allEntitiesRelated[selectedEntityType].fields}
            name={selectedEntityType}
            allEntities={entities}
            formType='create'
          />
        </Modal>
      }

      {isEditFormOpen && selectedEntityId &&
        <Modal close={() => {
          setSelectedEntityId(undefined);
          closeEditForm();
        }}>
          <EntityForm<'update', EntitiesNamesToTypes[typeof selectedEntityType]>
            apiFunc={updateEntity}
            fields={allEntitiesRelated[selectedEntityType].fields}
            name={selectedEntityType}
            allEntities={entities}
            entity={entities[selectedEntityType].find((item) => item.id === selectedEntityId) as any}
            formType='update'
          />
        </Modal>
      }

      <div className='m-5 flex gap-4'>
        <div className='min-w-fit p-4 rounded-md bg-white drop-shadow-md'>
          <h6 className='text-xl font-bold mb-2'>Сутності</h6>
          <div className='divide-y divide-gray-200'>
            {Object.keys(allEntitiesRelated).map(name =>
              <p className='py-2 pr-10' key={name} onClick={onEntityTypeClick(name as AllEntitiesNames)}>
                {ENTITY_TITLES[name as AllEntitiesNames]}
              </p>,
            )}
          </div>
        </div>
        <div className='w-full p-4 rounded-md bg-white drop-shadow-md mb-2'>
          <div className='flex justify-between'>
            <h6 className='text-xl font-bold'>{ENTITY_TITLES[selectedEntityType as AllEntitiesNames]}</h6>
            <button onClick={openCreateForm}
                    className='outline outline-1 px-2 py-1 text-green-500 rounded-md flex items-center gap-1 font-medium'>
              <PlusIcon className='w-5 inline stroke-2' />Додати
            </button>
          </div>
          <table className='table-fixed w-full mt-5'>
            <thead className='pb-6 border-b'>
            <tr className='text-left'>
              {Object.keys(allEntitiesRelated[selectedEntityType].fields).map(field =>
                <th className='pb-2' key={field}>{FIELD_TITLES[field as keyof typeof FIELD_TITLES]}</th>,
              )}
              <th className='w-10'></th>
              <th className='w-10'></th>
            </tr>
            </thead>
            <tbody className='space-y-4 divide-y divide-gray-200'>
            {
              entities[selectedEntityType].length ?
                entities[selectedEntityType].map((item) =>
                  (<tr key={item.id} className='h-10'>
                    {
                      Object.keys(allEntitiesRelated[selectedEntityType].fields).map((fieldName) => {
                        const field = item[fieldName as keyof typeof item];
                        return(
                        <td key={fieldName}>
                          {typeof field === 'object' ? getDisplayName(fieldName as AllEntitiesNames, field) : field}
                        </td>)
                      })
                    }
                    <td>
                      <button
                        onClick={() => {
                          setSelectedEntityId(item.id);
                          openEditForm();
                        }}
                      ><PencilIcon className='w-6 stroke-blue-600' /></button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(item.id)}
                      ><TrashIcon className='w-6 stroke-red-600' /></button>
                    </td>
                  </tr>),
                ) : <tr className='text-lg mt-4 font-bold'>
                      <td colSpan={fieldsCount(selectedEntityType)}>
                        Тут ще нічого немає
                      </td>
                    </tr>
            }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AdminPanel;