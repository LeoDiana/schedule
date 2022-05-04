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

//not need
export interface TextOnlyEntity {
  [key: string]: string;
}

//not need
export interface CreateFormWithTextFieldsOnly {
  title: string;
  fields: TextFieldValues[];
  createApiCall(obj: TextOnlyEntity): Promise<string>;
}

//not need
interface TextFieldValues {
  name: string;
  label: string;
}

//not need
export interface CreateFormTeacher {
  title: string;
  fields: FieldValues[];
  createApiCall(obj: any): Promise<string>;
}

//not need
interface FieldValues {
  name: string;
  label: string;
  type: FieldType;
  helperText?: string;
  getEntitiesForList?(): Promise<any>;
}

type FieldType = "text" | "number" | "entity";
type FormType = "create" | "update";

export type FieldScheme<T> = {
  // name: string;
  label: string;
  type: FieldType;
  helperText?: string;
  getEntitiesForList?(): Promise<T[]>;
  makeShortShownName?(obj: T): string;
};

// Record<keys, Type>
export type FieldsScheme<T> = {
  [K in keyof T]: FieldScheme<K>; // K | Pick
};

export type FormScheme<T> = {
  title: string;
  apiCall(entity: T): Promise<string>;
  fields: FieldsScheme<T>;
  type: FormType;
};

/*
fields: {
"firstName" : {field}
}
* */
