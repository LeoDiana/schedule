/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';
import { Button, Grid, MenuItem, Select, TextField } from '@mui/material';
import { Form, Formik, FormikValues } from 'formik';
import * as Yup from 'yup';

import { AllEntities, EntityInfoFieldComplex, FieldsOfType, FormScheme } from '../common/types';
import { createEmptyEntity, simplifyEntityFields } from '../common/entitiesInfo';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../common/constants';

/*
TODO config form status
TODO add error message in validation form
* */

export interface FormStatus {
  message: string;
  type: string;
}

export interface FormStatusProps {
  [key: string]: FormStatus;
}

export const formStatusProps: FormStatusProps = {
  success: {
    message: 'Success',
    type: 'success',
  },
  duplicate: {
    message: 'Same entity already exist.',
    type: 'error',
  },
  error: {
    message: 'Something went wrong. Please try again.',
    type: 'error',
  },
};

const createFormValidationSchema = (fields: any) => {
  const validationSchema: { [k: string]: any } = {};
  Object.keys(fields).forEach((fieldName) => {
    const requiredError = `${fields[fieldName].label} is required`;
    switch (fields[fieldName].type) {
      case 'text':
        validationSchema[fieldName] = Yup.string().required(requiredError);
        break;
      case 'number':
        validationSchema[fieldName] = Yup.number().required(requiredError);
        break;
      case 'entity':
        validationSchema[fieldName] = Yup.string().required(requiredError); //Yup.object().required(requiredError);
        break;
    }
  });
  return Yup.object().shape(validationSchema);
};

interface CommonFormProps<T extends AllEntities> {
  formScheme: FormScheme<T>;
  obj?: FieldsOfType<T>;
}

// this is common form for creating and updating entities
function CommonForm<T extends AllEntities>({ formScheme, obj }: CommonFormProps<T>): any {
  const [entityFieldsData, setEntityFieldsData] = useState({});

  useEffect(() => {
    const fetchedEntities: { [k: string]: any } = {};
    const fetchData = async () => {
      for (const fieldName in formScheme.fields) {
        const field = formScheme.fields[fieldName] as EntityInfoFieldComplex;
        if (field.type === 'entity') {
          fetchedEntities[fieldName] = await field.getEntitiesForList();
        }
      }
      setEntityFieldsData(fetchedEntities);
    };

    fetchData();
  }, []);

  const [displayFormStatus, setDisplayFormStatus] = useState(false);
  const [formStatus, setFormStatus] = useState({
    message: '',
    type: '',
  });

  const initialValues = simplifyEntityFields(obj) || createEmptyEntity(formScheme.name) || {};
  const validationSchema = createFormValidationSchema(formScheme.fields);

  const transformEntityFieldsValuesToObject = (formValues: FormikValues) => {
    let updatedData = { ...formValues };
    for (const fieldName in formScheme.fields) {
      if (formScheme.fields[fieldName].type === 'entity') {
        const selectedEntity = (entityFieldsData as { [k: string]: any[] })[fieldName].find(
          (el: any) => el.id === formValues[fieldName],
        );
        updatedData = {
          ...updatedData,
          [fieldName]: selectedEntity,
        };
      }
    }
    return updatedData;
  };

  const apiCall = async (formValues: FormikValues, resetForm?: any) => {
    const data = transformEntityFieldsValuesToObject(formValues);
    const newEntity = (obj ? { id: obj.id, ...data } : data) as FieldsOfType<T>;
    const response = await formScheme.apiCall(newEntity);
    if (response === ERROR_MESSAGE) {
      setFormStatus(formStatusProps.error);
    } else if (response === SUCCESS_MESSAGE) {
      setFormStatus(formStatusProps.success);
      resetForm({});
    }
    setDisplayFormStatus(true);
  };

  return (
    <div>
      <Formik
        enableReinitialize
        key={JSON.stringify(initialValues)}
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          apiCall(values);
          setDisplayFormStatus(true);
          setTimeout(() => {
            actions.setSubmitting(false);
          }, 500);
        }}
        validationSchema={validationSchema}
      >
        {(props) => {
          const { values, touched, errors, handleBlur, handleChange, isSubmitting } = props;
          return (
            <Form>
              <h1 style={{ textAlign: 'center' }}>{formScheme.title}</h1>
              <Grid container direction="row" justifyContent="center">
                {(() => {
                  const fieldComponents = [];
                  for (const fieldName in formScheme.fields) {
                    fieldComponents.push(
                      <Grid key={fieldName} item lg={10} md={10} sm={10} xs={10}>
                        {(() => {
                          const vals = values as FieldsOfType<T>;
                          const fieldVal = vals[fieldName];
                          const errName = (errors as unknown as { [k: string]: boolean })[
                            fieldName
                          ];
                          const touchedName = (touched as { [k: string]: boolean })[fieldName];
                          if (
                            formScheme.fields[fieldName].type === 'text' ||
                            formScheme.fields[fieldName].type === 'number'
                          ) {
                            return (
                              <TextField
                                name={fieldName}
                                id={fieldName}
                                label={formScheme.fields[fieldName].label}
                                value={fieldVal}
                                type={formScheme.fields[fieldName].type}
                                helperText={errName && touchedName ? errName : null}
                                error={errName && touchedName}
                                onChange={handleChange}
                                onFocus={() => {
                                  setDisplayFormStatus(false);
                                }}
                                onBlur={handleBlur}
                                required
                                autoComplete="off"
                                margin="dense"
                                fullWidth
                              />
                            );
                          }
                          if (formScheme.fields[fieldName].type === 'entity') {
                            const fetchedEntities = (entityFieldsData as { [k: string]: any })[
                              fieldName
                            ];
                            return (
                              <TextField
                                name={fieldName}
                                id={fieldName}
                                select
                                label={formScheme.fields[fieldName].label}
                                value={fieldVal}
                                error={errName && touchedName}
                                onChange={handleChange}
                                onFocus={() => {
                                  setDisplayFormStatus(false);
                                }}
                                onBlur={handleBlur}
                                required
                                margin="dense"
                                fullWidth
                              >
                                {fetchedEntities
                                  ? fetchedEntities.map((item: any) => (
                                      <MenuItem value={item.id} key={JSON.stringify(item)}>
                                        {(
                                          formScheme.fields[fieldName] as EntityInfoFieldComplex
                                        ).makeShortShownName(item) || item.name}
                                      </MenuItem>
                                    ))
                                  : null}
                              </TextField>
                            );
                          }
                        })()}
                      </Grid>,
                    );
                  }
                  return fieldComponents;
                })()}
                <Grid item lg={10} md={10} sm={10} xs={10} margin={'1em'}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                  >
                    Submit
                  </Button>
                  {displayFormStatus && (
                    <div className="formStatus">
                      {formStatus.type === 'error' ? (
                        <p>{formStatus.message}</p>
                      ) : formStatus.type === 'success' ? (
                        <p>{formStatus.message}</p>
                      ) : null}
                    </div>
                  )}
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default CommonForm;
