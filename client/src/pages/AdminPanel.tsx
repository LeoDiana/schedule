import React, {useEffect, useState} from "react";
import {PencilIcon, PlusIcon, TrashIcon} from "@heroicons/react/24/outline";
import {allEntitiesRelated} from "../entities/entitiesRelated";
import {ENTITY_TITLES, FIELD_TITLES} from "../common/constants";
import {AllEntitiesNames, EntitiesNamesToTypes} from "../common/types";
import CreateForm from "../components/CreateForm";
import {useModal} from "../common/hooks";
import {AcademicStatus, Teacher} from "../entities/entitiesClasses";

function AdminPanel(): JSX.Element {
  const [selectedEntityType, setSelectedEntityType] = useState<AllEntitiesNames>('academicStatus');
  const [isModalOpen, openModal, closeModal] = useModal();
  const [ac, setAC] = useState<Array<any>>([]);

  useEffect(() => {
    const fetchData = async () => {
      setAC(await allEntitiesRelated.academicStatus.api.readAll());
    };

    fetchData();
  }, [])


  function onEntityTypeClick(entity: AllEntitiesNames) {
    return () => {
      setSelectedEntityType(entity);
    }
  }

  function handleDelete(id: number) {
    (async () => {
      // const response = await allEntitiesRelated.academicStatus.api.delete(id);
      await allEntitiesRelated.academicStatus.api.delete(id);
      // if (response === SUCCESS_MESSAGE) {
      //   setExecutedOperation('delete');
      // }
    })();
  }

  return (
    <>
      {isModalOpen ?
        <>
          <div
            onClick={closeModal}
            className='fixed w-screen h-screen top-0 z-10 backdrop-blur bg-black/50'></div>
          <CreateForm<EntitiesNamesToTypes[typeof selectedEntityType]>
            apiCreateFunc={allEntitiesRelated[selectedEntityType].api.create as any}
            createEmptyEntity={allEntitiesRelated[selectedEntityType].createEmpty}
            fields={allEntitiesRelated[selectedEntityType].fields}
            name={selectedEntityType}
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
              </p>
            )}
          </div>
        </div>
        <div className='w-full p-4 rounded-md bg-white drop-shadow-md mb-2'>
          <div className='flex justify-between'>
            <h6 className='text-xl font-bold'>{ENTITY_TITLES[selectedEntityType as AllEntitiesNames]}</h6>
            <button onClick={openModal}
                    className='outline outline-1 px-2 py-1 text-green-500 rounded-md flex items-center gap-1 font-medium'>
              <PlusIcon className='w-5 inline stroke-2'/>Додати
            </button>
          </div>
          <table className="table-fixed w-full mt-5">
            <thead className='pb-6 border-b'>
            <tr className='text-left'>
              {Object.keys(allEntitiesRelated[selectedEntityType].fields).map(field =>
                <th className='pb-2' key={field}>{FIELD_TITLES[field as keyof typeof FIELD_TITLES]}</th>
              )}
              <th className='w-10'></th>
              <th className='w-10'></th>
            </tr>
            </thead>
            <tbody className='space-y-4 divide-y divide-gray-200'>
            {
              ac.length ?
                ac.map((item) =>
                  (<tr key={item.id} className='h-10'>
                    <td>{item.name}</td>
                    <td>{item.shortName}.</td>
                    <td>
                      <button><PencilIcon className='w-6 stroke-blue-600'/></button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(item.id)}
                      ><TrashIcon className='w-6 stroke-red-600'/></button>
                    </td>
                  </tr>)
                ) : null
            }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default AdminPanel;