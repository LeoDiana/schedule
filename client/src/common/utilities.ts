import { FieldsOfType } from './types';

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const convertToKebab = (str: string): string => {
  return str.replace(/[A-Z]/g, (match, offset, string) => {
    return (offset > 0 ? '-' : '') + match.toLowerCase();
  });
};
