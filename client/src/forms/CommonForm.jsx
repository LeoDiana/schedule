import React, { useEffect, useState } from 'react';
import { Button, Grid, MenuItem, Select, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../api/apiCalls';
import { formStatusProps } from './common';

/*
TODO config form status
TODO add error message in validation form
* */

const createFormInitialValues = (fields) => {
  const initialValues = {};
  Object.keys(fields).forEach((fieldName) => (initialValues[fieldName] = ''));
  return initialValues;
};

const createFormValidationSchema = (fields) => {
  let validationSchema = {};
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

// this is common form for creating and updating entities
const CommonForm = (formScheme, obj) => {
  const [entityFieldsData, setEntityFieldsData] = useState({});

  useEffect(() => {
    const fetchedEntities = {};
    const fetchData = async () => {
      Object.keys(formScheme.fields)
        .filter((fieldName) => formScheme.fields[fieldName].type === 'entity')
        .map(async (fieldName) => {
          fetchedEntities[fieldName] = await formScheme.fields[
            fieldName
          ].getEntitiesForList();
        });
      setEntityFieldsData(fetchedEntities);
    };

    fetchData();
  }, []);

  const [displayFormStatus, setDisplayFormStatus] = useState(false);
  const [formStatus, setFormStatus] = useState({
    message: '',
    type: '',
  });

  const initialValues = obj || createFormInitialValues(formScheme.fields) || {};
  const validationSchema = createFormValidationSchema(formScheme.fields);

  const apiCall = async (data, resetForm) => {
    const newEntity = obj ? { id: obj.id, ...data } : data;
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
        key={initialValues}
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          apiCall(values, actions.resetForm);
          setTimeout(() => {
            actions.setSubmitting(false);
          }, 500);
        }}
        validationSchema={validationSchema}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            handleBlur,
            handleChange,
            isSubmitting,
          } = props;
          return (
            <Form>
              <h1>{formScheme.title}</h1>
              <Grid container direction="row">
                {Object.keys(formScheme.fields).map((fieldName) => (
                  <Grid key={fieldName} item lg={10} md={10} sm={10} xs={10}>
                    {(() => {
                      if (
                        formScheme.fields[fieldName].type === 'text' ||
                        formScheme.fields[fieldName].type === 'number'
                      ) {
                        return (
                          <TextField
                            name={fieldName}
                            id={fieldName}
                            label={formScheme.fields[fieldName].label}
                            value={values[fieldName]}
                            type={formScheme.fields[fieldName].type}
                            helperText={
                              errors.name && touched.name
                                ? errors.name
                                : `Enter ${formScheme.fields[fieldName].label}`
                            }
                            error={!!(errors.name && touched.name)}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        );
                      }
                      if (formScheme.fields[fieldName].type === 'entity') {
                        return (
                          <Select
                            name={fieldName}
                            id={fieldName}
                            label={formScheme.fields[fieldName].label}
                            labelId={formScheme.fields[fieldName].label}
                            value={values[fieldName]}
                            type="text"
                            error={!!(errors.name && touched.name)}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {entityFieldsData[fieldName]
                              ? entityFieldsData[fieldName].map((item, i) => (
                                  <MenuItem value={item} key={item.name + i}>
                                    {formScheme.fields[
                                      fieldName
                                    ].makeShortShownName(item) || item.name}
                                  </MenuItem>
                                ))
                              : null}
                          </Select>
                        );
                      }
                    })()}
                  </Grid>
                ))}
                <Grid item lg={10} md={10} sm={10} xs={10}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
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
};

export default CommonForm;
