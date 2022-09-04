import React, { useEffect, useState } from 'react';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { allEntitiesRelated } from '../entities/entitiesRelated';
import { ENTITY_TITLES, FIELD_TITLES } from '../common/constants';
import {
  AllEntitiesItems,
  AllEntitiesNames,
  EntitiesNamesToTypes,
} from '../common/types';
import { useModal } from '../common/hooks';
import EntityForm from '../components/EntityForm';

function AdminPanel(): JSX.Element {
  const [selectedEntityType, setSelectedEntityType] = useState<AllEntitiesNames>('academicStatus');
  const [isCreateFormOpen, openCreateForm, closeCreateForm] = useModal();
  const [isEditFormOpen, openEditForm, closeEditForm] = useModal();
  const [entities, setEntities] = useState<AllEntitiesItems>({
    academicStatus: [],
    teacher: [],
    lessonTime: [],
    day: [],
  });
  const [selectedEntityId, setSelectedEntityId] = useState<number>();

  useEffect(() => {
    const fetchData = async () => {
      let entity: keyof typeof allEntitiesRelated;
      const fetched = {} as AllEntitiesItems;
      for (entity in allEntitiesRelated) {
        const ent = await allEntitiesRelated[entity].api.readAll();
        fetched[entity] = ent;
      }
      setEntities(fetched);
    };

    fetchData();
  }, []);


  function onEntityTypeClick(entity: AllEntitiesNames) {
    return () => {
      setSelectedEntityType(entity);
    };
  }

  function handleDelete(id: number) {
    (async () => {
      await allEntitiesRelated[selectedEntityType].api.delete(id);
      const filtered = entities[selectedEntityType].filter((item) => item.id !== id);
      setEntities((ents) => ({ ...ents, [selectedEntityType]: filtered }));
    })();
  }

  // function selectEntityFieldsItems(entity: AllEntitiesNames) {
  //   // const selectedEntities = {} as any;
  //   // const selectedEntities = {} as ArraysOfEntityFieldsOf<EntitiesNamesToTypes[typeof entity]>;
  //   const selectedEntities = {} as {[K in keyof EntityFieldsOf<EntitiesNamesToTypes[typeof entity]>]: Array<any>};
  //   // const selectedEntities = {} as ArraysOfEntityFieldsOf<Teacher>;
  //   // const selectedEntities = {} as { academicStatus: AcademicStatus[] };
  //
  //   const entityFields = allEntitiesRelated[entity].fields;
  //   for(const fieldName in entityFields){
  //     if(entityFields[fieldName as keyof typeof entityFields] === 'entity'){
  //       const fn = fieldName as AllEntitiesNames;
  //       selectedEntities[fieldName as keyof typeof selectedEntities] = entities[fieldName as keyof typeof entities] as Array<EntitiesNamesToTypes[typeof fn]>;
  //     }
  //   }
  //
  //   return selectedEntities;
  // }

  function fieldsCount(ent: AllEntitiesNames) {
    return Object.keys(allEntitiesRelated[ent].fields).length + 2;
  }

  return (
    <>
      {isCreateFormOpen ?
        <>
          <div
            onClick={closeCreateForm}
            className='fixed w-screen h-screen top-0 z-10 backdrop-blur bg-black/50'></div>
          {/* in Func need to wrap function to save it`s context */}
          <EntityForm<'create', EntitiesNamesToTypes[typeof selectedEntityType]>
            apiFunc={((...params: any[]) => allEntitiesRelated[selectedEntityType].api.create(params as any))}
            entity={allEntitiesRelated[selectedEntityType].createEmpty()}
            fields={allEntitiesRelated[selectedEntityType].fields}
            name={selectedEntityType}
            allEntities={entities}
            formType='create'
          />
        </>
        : null
      }

      {isEditFormOpen && selectedEntityId ?
        <>
          <div
            onClick={() => {
              setSelectedEntityId(undefined);
              closeEditForm();
            }}
            className='fixed w-screen h-screen top-0 z-10 backdrop-blur bg-black/50'></div>
          {/* in Func need to wrap function to save it`s context */}
          <EntityForm<'update', EntitiesNamesToTypes[typeof selectedEntityType]>
            apiFunc={((...params: any[]) => allEntitiesRelated[selectedEntityType].api.update(params as any)) as any}
            fields={allEntitiesRelated[selectedEntityType].fields}
            name={selectedEntityType}
            allEntities={entities}
            entity={entities[selectedEntityType].find((item) => item.id === selectedEntityId) as any}
            formType='update'
          />
        </>
        : null
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
                      Object.keys(allEntitiesRelated[selectedEntityType].fields).map((fieldName) =>
                        <td
                          key={fieldName}>{typeof item[fieldName as keyof typeof item] === 'object' ? (item[fieldName as keyof typeof item] as any).displayName : item[fieldName as keyof typeof item]}</td>,
                      )
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