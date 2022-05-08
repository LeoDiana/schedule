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

const useDialog = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return [isOpen, open, close];
};

export const EntityPage = ({ name, fields, api, CreateForm, UpdateForm }) => {
  const [entities, setEntities] = useState();
  const [entityToUpdate, setEntityToUpdate] = useState();
  const [isOpenCreateDialog, openCreateDialog, closeCreateDialog] = useDialog();
  const [isOpenUpdateDialog, openUpdateDialog, closeUpdateDialog] = useDialog();
  const [executedOperation, setExecutedOperation] = useState();

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
              {Object.keys(fields).map((fieldName) => (
                <TableCell key={fieldName}>{fields[fieldName].label}</TableCell>
              ))}
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
                    {Object.keys(fields).map((fieldName) => (
                      <TableCell key={`${JSON.stringify(entity)}-${fieldName}`}>
                        {entity[fieldName]
                          ? fields[fieldName].type === 'entity'
                            ? fields[fieldName].makeShortShownName(entity[fieldName])
                            : entity[fieldName]
                          : null}
                      </TableCell>
                    ))}
                    <TableCell align="right">
                      <Button
                        data-id={entity.id}
                        onClick={(e) => {
                          setEntityToUpdate({
                            ...entities.filter(
                              (ent) => ent.id.toString() === e.target.dataset.id.toString(),
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
                            const response = await api.delete(e.target.dataset.id.toString());
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
};
