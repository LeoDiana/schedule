/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { AllEntities, EntityInfoFieldComplex, FieldsOfType } from '../common/types';
import { EntityInfoInterface } from '../common/entitiesInfo';
import { ENTITY_SHOWN_NAMES, SUCCESS_MESSAGE } from '../common/constants';
import { useSelector } from 'react-redux';
import { selectAllEntitiesOfType } from '../features/entities/entitiesSlice';

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
  // const [entities, setEntities] = useState([] as FieldsOfType<T>[]);
  const entities = useSelector((state: any) => selectAllEntitiesOfType(state, name as AllEntities));
  const [entityToUpdate, setEntityToUpdate] = useState({} as FieldsOfType<T>);
  const [isOpenCreateDialog, openCreateDialog, closeCreateDialog] = useDialog();
  const [isOpenUpdateDialog, openUpdateDialog, closeUpdateDialog] = useDialog();
  const [executedOperation, setExecutedOperation] = useState(null as string | null);
  //
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setEntities(await api.readAll());
  //   };
  //
  //   fetchData();
  // }, []);
  //
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setEntities(await api.readAll());
  //   };
  //
  //   fetchData();
  //   setExecutedOperation(null);
  // }, [executedOperation]);

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
      <Box m={5}>
        <Grid container spacing={3} mb={3}>
          <Grid item ml={4}>
            <Typography variant="h4">{ENTITY_SHOWN_NAMES[name as AllEntities]}</Typography>
          </Grid>
          <Grid item>
            <Button onClick={openCreateDialog} variant="contained" color="primary">
              Add new
            </Button>
          </Grid>
        </Grid>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {(() => {
                  const rows = [];
                  for (const fieldName in fields) {
                    rows.push(<TableCell key={fieldName}>{fields[fieldName].label}</TableCell>);
                  }
                  return rows;
                })()}
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entities
                ? entities.map((entity: any) => (
                    <TableRow
                      key={JSON.stringify(entity)}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      {(() => {
                        const tableCells = [];
                        let fieldName: keyof typeof fields;
                        for (fieldName in fields) {
                          tableCells.push(
                            <TableCell key={`${JSON.stringify(entity)}-${fieldName}`}>
                              {entity[fieldName as keyof typeof entity]
                                ? fields[fieldName].type === 'entity'
                                  ? (
                                      fields[fieldName] as EntityInfoFieldComplex
                                    ).makeShortShownName(entity[fieldName as keyof typeof entity])
                                  : entity[fieldName as keyof typeof entity]
                                : null}
                            </TableCell>,
                          );
                        }
                        return tableCells;
                      })()}
                      <TableCell align="left">
                        <Button
                          data-id={entity.id}
                          onClick={(e) => {
                            const entity = entities.find(
                              (ent: any) =>
                                (ent as { id: any }).id.toString() ===
                                (
                                  e.target as unknown as { dataset: { id: any } }
                                ).dataset.id.toString(),
                            );
                            setEntityToUpdate({
                              ...entity,
                            } as any);
                            openUpdateDialog();
                          }}
                        >
                          Edit
                        </Button>
                      </TableCell>
                      <TableCell align="left">
                        <Button
                          color="warning"
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
      </Box>
    </>
  );
}
