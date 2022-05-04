import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import { Formik, Form, FormikProps } from "formik";
import * as Yup from "yup";

import {
  CreateFormWithTextFieldsOnly,
  FormStatus,
  formStatusProps,
  TextOnlyEntity,
} from "./common";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../api/apiCalls";

const CreateOnlyTextEntityForm = (formData: CreateFormWithTextFieldsOnly) => {
  const [displayFormStatus, setDisplayFormStatus] = useState(false);
  const [formStatus, setFormStatus] = useState<FormStatus>({
    message: "",
    type: "",
  });

  let initialValues = {} as TextOnlyEntity;
  formData.fields.forEach((field) => (initialValues[field.name] = ""));

  let validationSchema = {} as any;
  formData.fields.forEach(
    (field) =>
      (validationSchema[field.name] = Yup.string().required(
        `Please enter ${field.label}`
      ))
  );

  const create = async (data: TextOnlyEntity, resetForm: Function) => {
    const response = await formData.createApiCall(data);
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
        initialValues={initialValues}
        onSubmit={(values: TextOnlyEntity, actions) => {
          create(values, actions.resetForm);
          setTimeout(() => {
            actions.setSubmitting(false);
          }, 500);
        }}
        validationSchema={Yup.object().shape(validationSchema)}
      >
        {(props: FormikProps<TextOnlyEntity>) => {
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
              <h1>{formData.title}</h1>
              <Grid container direction="row">
                {formData.fields.map((field) => (
                  <Grid item lg={10} md={10} sm={10} xs={10}>
                    <TextField
                      name={field.name}
                      id={field.name}
                      label={field.label}
                      value={values[field.name]}
                      type="text"
                      helperText={
                        errors.name && touched.name
                          ? errors.name
                          : `Enter ${field.label}`
                      }
                      error={!!(errors.name && touched.name)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
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

export default CreateOnlyTextEntityForm;
