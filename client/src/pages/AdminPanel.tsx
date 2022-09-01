import React from "react";
import {PencilIcon, TrashIcon} from "@heroicons/react/24/outline";

function AdminPanel(): JSX.Element {
  return (
    <div className='m-5 flex gap-4'>
      <div className='min-w-fit p-4 rounded-md bg-white drop-shadow-md'>
        <h6 className='text-xl font-bold mb-2'>Entities</h6>
        <div className='divide-y divide-gray-200'>
          <p className='py-2 pr-10'>Teacher</p>
          <p className='py-2 pr-10'>Academic status</p>
          <p className='py-2'>Academic status</p>
          <p className='py-2'>Academic status</p>
          <p className='py-2'>Academic status</p>
          <p className='py-2'>Academic status</p>
        </div>
      </div>
      <div className='w-full p-4 rounded-md bg-white drop-shadow-md'>
        <h6 className='text-xl font-bold mb-2'>Academic status</h6>
        <table className="table-fixed w-full mt-5">
          <thead className='pb-6 border-b'>
          <tr className='text-left'>
            <th className='pb-2'>Name</th>
            <th className='pb-2'>Short name</th>
            <th className='w-10'></th>
            <th className='w-10'></th>
          </tr>
          </thead>
          <tbody className='space-y-4 divide-y divide-gray-200'>
          <tr className='h-10'>
            <td>Доцент</td>
            <td>доц.</td>
            <td><button><PencilIcon className='w-6 stroke-blue-600'/></button></td>
            <td><button><TrashIcon className='w-6 stroke-red-600'/></button></td>
          </tr>
          <tr className='h-10'>
            <td>Професор</td>
            <td>проф.</td>
            <td><button><PencilIcon className='w-6 stroke-blue-600'/></button></td>
            <td><button><TrashIcon className='w-6 stroke-red-600'/></button></td>
          </tr>
          <tr className='h-10'>
            <td>Асистент</td>
            <td>ас.</td>
            <td><button><PencilIcon className='w-6 stroke-blue-600'/></button></td>
            <td><button><TrashIcon className='w-6 stroke-red-600'/></button></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminPanel;