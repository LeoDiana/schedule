import { useEffect, useState } from 'react';
import { UpdateAcademicStatusForm } from './forms/CreateForms';

export const ListOfEntities = ({ readEntities, deleteEntity }) => {
  const [entities, setEntities] = useState();
  const [selectedEntity, setSelectedEntity] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setEntities(await readEntities());
    };

    fetchData();
  }, []);

  return (
    <>
      {entities ? (
        entities.map((entity) => (
          <p
            key={entity.id}
            id={entity.id}
            onClick={(e) => {
              setSelectedEntity(
                entities.filter(
                  (ent) => ent.id.toString() === e.target.id.toString(),
                )[0],
              );
            }}
          >
            {Object.keys(entity)
              .map((field) => `${field}: ${entity[field]}`)
              .join(' | ')}
            <strong
              onClick={(e) => {
                deleteEntity(e.target.parentNode.id.toString());
              }}
            >
              X
            </strong>
          </p>
        ))
      ) : (
        <p>Empty list</p>
      )}
      {selectedEntity ? <UpdateAcademicStatusForm {...selectedEntity} /> : null}
    </>
  );
};
