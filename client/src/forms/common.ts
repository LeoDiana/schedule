export interface FormStatus {
  message: string;
  type: string;
}

export interface FormStatusProps {
  [key: string]: FormStatus;
}

export const formStatusProps: FormStatusProps = {
  success: {
    message: "Added successfully.",
    type: "success",
  },
  duplicate: {
    message: "Same entity already exist.",
    type: "error",
  },
  error: {
    message: "Something went wrong. Please try again.",
    type: "error",
  },
};

export interface TextOnlyEntity {
  [key: string]: string;
}

export interface CreateFormWithTextFieldsOnly {
  title: string;
  fields: TextFieldValues[];
  createApiCall(obj: TextOnlyEntity): Promise<string>;
}

interface TextFieldValues {
  name: string;
  label: string;
}
