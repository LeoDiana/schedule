import { FIELD_TITLES } from '../common/constants';
import React from 'react';

interface Props {
  name: string,
  value: undefined | string,
  onChange: (value: string) => void,
}

function TextInput({ name, value, onChange }: Props): JSX.Element {
  return (
    <div className='w-full flex flex-col'>
      <label htmlFor={name} className='font-medium mb-0.5'>{FIELD_TITLES[name as keyof typeof FIELD_TITLES]}</label>
      <input id={name} type='text' onChange={(event) => onChange(event.target.value)}  value={value}
             className='rounded-md border-2 drop-shadow-sm text-lg px-2 py-1' />
    </div>
  );
}

export default TextInput;