// @ts-nocheck

import React, { useEffect, useState } from "react";
import { Button, Grid, MenuItem, Select, TextField } from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";

import {
  FieldScheme,
  FieldsScheme,
  FormScheme,
  FormStatus,
  formStatusProps,
} from "./common";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../api/apiCalls";

const createFormInitialValues = <T,>(fields: FieldsScheme<T>) => {
  const initialValues = {} as Record<keyof T, string>;
  fields
    .keys()
    .forEach((fieldName: keyof T) => (initialValues[fieldName] = ""));
  return initialValues;
};

// TODO add error message. When it appears?
const createFormValidationSchema = <T,>(fields: FieldsScheme<T>) => {
  let validationSchema = {} as Record<keyof T, any>;
  fields.keys().forEach((fieldName: keyof T) => {
    switch (fields[fieldName].type) {
      case "text":
        validationSchema[fieldName] = Yup.string().required();
        break;
      case "number":
        validationSchema[fieldName] = Yup.number().required();
        break;
      case "entity":
        validationSchema[fieldName] = Yup.array().required();
        break;
    }
  });
  return Yup.object().shape(validationSchema);
};

// this is common form for creating and updating entities
const CommonForm = <T extends object>(formScheme: FormScheme<T>) => {
  const [entityFieldsData, setEntityFieldsData] = useState({});

  useEffect(() => {
    const fetchedEntities = {} as Partial<T>;
    const fetchData = async () => {
      formScheme.fields
        .keys()
        .filter(
          (fieldName: keyof T) => formScheme.fields[fieldName].type === "entity"
        )
        .map((fieldName: keyof T) => {
          fetchedEntities[fieldName] = await formScheme.fields[
            fieldName
          ].getEntitiesForList();
        });
      setEntityFieldsData(fetchedEntities);
    };

    fetchData();
  }, []);

  const [displayFormStatus, setDisplayFormStatus] = useState(false); // TODO think how can I use it
  const [formStatus, setFormStatus] = useState<FormStatus>({
    //TODO this too
    message: "",
    type: "",
  });

  let initialValues = createFormInitialValues(formScheme.fields);
  let validationSchema = createFormValidationSchema(formScheme.fields);

  const apiCall = async (data: T, resetForm: Function) => {
    const response = await formScheme.apiCall(data);
    if (response === ERROR_MESSAGE) {
      setFormStatus(formStatusProps.error);
    } else if (response === SUCCESS_MESSAGE) {
      setFormStatus(formStatusProps.success);
      resetForm({});
    }
    setDisplayFormStatus(true);
  };

  /*
  submit button should have different name depends on form type or has common name for all form types
  * */
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          apiCall(values, actions.resetForm);
          setTimeout(() => {
            actions.setSubmitting(false);
          }, 500);
        }}
        validationSchema={validationSchema}
      >
        {(props: FormikProps<any>) => {
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
                {formScheme.fields.keys().map((fieldName: FieldScheme) => (
                  <Grid key={fieldName} item lg={10} md={10} sm={10} xs={10}>
                    {(() => {
                      if (field.type === "text" || field.type === "number") {
                        return (
                          <TextField
                            name={fieldName}
                            id={fieldName}
                            label={formScheme[fieldName].label}
                            value={values[fieldName]}
                            type={field.type}
                            helperText={
                              errors.name && touched.name
                                ? errors.name
                                : `Enter ${formScheme[fieldName].label}`
                            }
                            error={!!(errors.name && touched.name)}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        );
                      }
                      if (field.type === "entity") {
                        return (
                          <Select
                            name={fieldName}
                            id={fieldName}
                            label={formScheme[fieldName].label}
                            labelId={formScheme[fieldName].label}
                            value={values[fieldName]}
                            type="text"
                            error={!!(errors.name && touched.name)}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {entityFieldsData[fieldName].map((item) => (
                              <MenuItem value={item}>
                                {formScheme[fieldName].makeShortShownName() ||
                                  item.name}
                              </MenuItem>
                            ))}
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
                      // TODO
                      {formStatus.type === "error" ? (
                        <p>{formStatus.message}</p>
                      ) : formStatus.type === "success" ? (
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
