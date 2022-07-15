/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';
import { Button, Grid, MenuItem, Select, TextField } from '@mui/material';
import { Form, Formik, FormikValues } from 'formik';
import * as Yup from 'yup';

import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../api/apiCalls';
import { formStatusProps } from './common';
import { AllEntities, EntityInfoFieldComplex, FieldsOfType, FormScheme } from '../common/types';
import { createEmptyEntity } from '../common/entitiesInfo';

/*
TODO config form status
TODO add error message in validation form
* */

const createFormValidationSchema = (fields: any) => {
  const validationSchema: { [k: string]: any } = {};
  Object.keys(fields).forEach((fieldName) => {
    switch (fields[fieldName].type) {
      case 'text':
        validationSchema[fieldName] = Yup.string().required();
        break;
      case 'number':
        validationSchema[fieldName] = Yup.number().required();
        break;
      case 'entity':
        validationSchema[fieldName] = Yup.object().required();
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

  const initialValues = obj || createEmptyEntity(formScheme.name) || {};
  const validationSchema = createFormValidationSchema(formScheme.fields);

  const apiCall = async (data: FormikValues, resetForm?: any) => {
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
              <h1>{formScheme.title}</h1>
              <Grid container direction="row">
                {(() => {
                  const fieldComponents = [];
                  for (const fieldName in formScheme.fields) {
                    fieldComponents.push(
                      <Grid key={fieldName} item lg={10} md={10} sm={10} xs={10}>
                        {(() => {
                          const vals = values as FieldsOfType<T>;
                          const fieldVal = vals[fieldName];
                          const errName = (errors as { name: string }).name;
                          const touchedName = (touched as { name: string }).name;
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
                                helperText={
                                  errName && touchedName
                                    ? errName
                                    : `Enter ${formScheme.fields[fieldName].label}`
                                }
                                error={!!(errName && touchedName)}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            );
                          }
                          if (formScheme.fields[fieldName].type === 'entity') {
                            const fetchedEntities = (entityFieldsData as { [k: string]: any })[
                              fieldName
                            ];
                            return (
                              <Select
                                name={fieldName}
                                id={fieldName}
                                label={formScheme.fields[fieldName].label}
                                labelId={formScheme.fields[fieldName].label}
                                value={fieldVal}
                                error={!!(errName && touchedName)}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                {obj && obj[fieldName] ? (
                                  <MenuItem value={JSON.stringify(fieldVal)}>
                                    {(
                                      formScheme.fields[fieldName] as EntityInfoFieldComplex
                                    ).makeShortShownName(fieldVal)}
                                  </MenuItem>
                                ) : null}
                                {fetchedEntities
                                  ? fetchedEntities.map((item: any) => (
                                      <MenuItem value={item} key={JSON.stringify(item)}>
                                        {(
                                          formScheme.fields[fieldName] as EntityInfoFieldComplex
                                        ).makeShortShownName(item) || item.name}
                                      </MenuItem>
                                    ))
                                  : null}
                              </Select>
                            );
                          }
                        })()}
                      </Grid>,
                    );
                  }
                  return fieldComponents;
                })()}
                <Grid item lg={10} md={10} sm={10} xs={10}>
                  <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
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
