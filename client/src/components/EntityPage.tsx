/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { SUCCESS_MESSAGE } from '../api/apiCalls';
import {
  AllEntities,
  EntityInfoFieldComplex,
  EntityInfoFields,
  FieldsOfType,
} from '../common/types';
import { EntityInfoInterface } from '../common/entitiesInfo';

const useDialog = (): [boolean, () => void, () => void] => {
  const [isOpen, setIsOpen] = React.useState(false);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return [isOpen, open, close];
};

export function EntityPage<T extends AllEntities>({
  name,
  fields,
  api,
  CreateForm,
  UpdateForm,
}: EntityInfoInterface<T>) {
  const [entities, setEntities] = useState([] as FieldsOfType<T>[]);
  const [entityToUpdate, setEntityToUpdate] = useState({} as FieldsOfType<T>);
  const [isOpenCreateDialog, openCreateDialog, closeCreateDialog] = useDialog();
  const [isOpenUpdateDialog, openUpdateDialog, closeUpdateDialog] = useDialog();
  const [executedOperation, setExecutedOperation] = useState(null as string | null);

  useEffect(() => {
    const fetchData = async () => {
      setEntities(await api.readAll());
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setEntities(await api.readAll());
    };

    fetchData();
    setExecutedOperation(null);
  }, [executedOperation]);

  return (
    <>
      <Dialog
        open={isOpenCreateDialog}
        onClose={() => {
          closeCreateDialog();
          setExecutedOperation('create');
        }}
      >
        <DialogContent>
          <CreateForm />
        </DialogContent>
      </Dialog>
      <Button onClick={openCreateDialog} variant="contained" color="primary">
        Add new
      </Button>
      <Dialog
        open={isOpenUpdateDialog}
        onClose={() => {
          closeUpdateDialog();
          setExecutedOperation('update');
        }}
      >
        <DialogContent>
          <UpdateForm {...entityToUpdate} />
        </DialogContent>
      </Dialog>
      <h1>{name}</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              {(() => {
                for (const fieldName in fields) {
                  return <TableCell key={fieldName}>{fields[fieldName].label}</TableCell>;
                }
              })()}
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entities
              ? entities.map((entity) => (
                  <TableRow
                    key={JSON.stringify(entity)}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    {(() => {
                      const tableCells = [];
                      for (const fieldName in fields) {
                        tableCells.push(
                          <TableCell key={`${JSON.stringify(entity)}-${fieldName}`}>
                            {entity[fieldName]
                              ? fields[fieldName].type === 'entity'
                                ? (fields[fieldName] as EntityInfoFieldComplex).makeShortShownName(
                                    entity[fieldName],
                                  )
                                : entity[fieldName]
                              : null}
                          </TableCell>,
                        );
                      }
                      return tableCells;
                    })()}
                    <TableCell align="right">
                      <Button
                        data-id={entity.id}
                        onClick={(e) => {
                          setEntityToUpdate({
                            ...entities.filter(
                              (ent) =>
                                (ent as { id: any }).id.toString() ===
                                (
                                  e.target as unknown as { dataset: { id: any } }
                                ).dataset.id.toString(),
                            )[0],
                          });
                          openUpdateDialog();
                        }}
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        data-id={entity.id}
                        onClick={(e) => {
                          (async () => {
                            const response = await api.delete(
                              (
                                e.target as unknown as { dataset: { id: any } }
                              ).dataset.id.toString(),
                            );
                            if (response === SUCCESS_MESSAGE) {
                              setExecutedOperation('delete');
                            }
                          })();
                        }}
                      >
                        Del
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
