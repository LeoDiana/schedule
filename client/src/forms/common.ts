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
