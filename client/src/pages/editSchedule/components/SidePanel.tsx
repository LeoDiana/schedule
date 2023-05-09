import React from 'react';
import { ArrowDownTrayIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Props {
  onDrop: () => void,
  onCreate: () => void,
  onDelete: () => void,
  onSave: () => void,
  cards: JSX.Element | JSX.Element[],
}

export function SidePanel({ onDrop,
                            onCreate,
                            onDelete,
                            onSave, cards }: Props) {
  return (
    <div className='border-blue-300 border-l-4 p-3 flex flex-col gap-2'
         onDragEnter={(e) => {
           e.preventDefault();
         }}
         onDragOver={(e) => {
           e.preventDefault();
         }}
         onDrop={onDrop}
    >
      <button
        className='p-2 rounded-lg border-2 border-rose-500 text-rose-500 font-semibold mb-2'
        onClick={onDelete}
      >
        <TrashIcon className='w-5 inline stroke-2' /> Видалити обране
      </button>
      <button
        className='p-2 rounded-lg border-2 border-green-500 text-green-500 font-semibold mb-2'
        onClick={onCreate}
      >
        <PlusIcon className='w-5 inline stroke-2' /> Створити
      </button>
      <button
        className='p-2 rounded-lg border-2 border-blue-500 text-blue-500 font-semibold mb-2'
        onClick={onSave}
      >
        <ArrowDownTrayIcon className='w-5 inline stroke-2' /> Зберегти зміни
      </button>
      {
        cards || <div className='pt-5 text-center text-gray-400'>Перетягніть заняття сюди</div>
      }
    </div>
  );
}