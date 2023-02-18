import React, { useState } from 'react';
import { FIELD_TITLES } from '../../common/constants';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { getDisplayName } from '../../entities/entitiesRelated';
import { AllEntitiesNames } from '../../common/types';

interface Props {
  name: string,
  value: any,
  onChange: (value: any) => void,
  items: Array<any>;
}

function getInputDisplayValue(entityName: AllEntitiesNames, item: any): string {
  if(!item){
    return '';
  }

  if(typeof item === 'object'){
    return getDisplayName(entityName, item);
  }

  return FIELD_TITLES[item as keyof typeof FIELD_TITLES] || item
}

function DropdownInput({ name, value, onChange, items }: Props): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    <div className={`w-screen h-screen fixed z-30 top-0 right-0 ${isOpen ? 'visible' : 'invisible'}`} onClick={()=>{
      setIsOpen(false);
    }}>
    </div>
    <div className='w-full flex flex-col'>
      <label htmlFor={name} className='font-medium mb-0.5'>{FIELD_TITLES[name as keyof typeof FIELD_TITLES] || name}</label>
      <div className='w-full relative'>
        <input id={name} type='text'
               onChange={(event) => onChange(Number(event.target.value))}
               value={getInputDisplayValue(name as AllEntitiesNames, value)}
               autoComplete='off'
               className='w-full rounded-md border-2 drop-shadow-sm text-lg pl-2 pr-9 py-1' />
        <ChevronDownIcon onClick={() => setIsOpen(s => !s)}
                         className='w-6 absolute right-2 top-1/2 -translate-y-1/2 stroke-2 text-gray-500' />
      </div>
      <div className='relative'>
        {isOpen &&
          <div
            className='w-full bg-white drop-shadow-sm rounded-md py-1 border-2 text-lg gap-2 absolute z-30 top-0 mt-1'>
            {items.map((item: any) =>
              <div
                key={JSON.stringify(item)}
                onClick={() => {
                  onChange(item);
                  setIsOpen(false);
                }}
                className='hover:bg-gray-100 px-2'
              >
                {getInputDisplayValue(name as AllEntitiesNames, item)}
              </div>
            )}
          </div>
        }
      </div>
    </div>
    </>
  );
}

export default DropdownInput;