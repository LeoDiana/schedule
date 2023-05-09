import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../common/routes';

function Home() {
  const linkStyles = 'text-xl text-gray-600 hover:text-gray-900 font-semibold'
  return (
    <div className='flex flex-col items-center justify-center w-screen h-screen gap-6'>
      <h1 className='text-3xl font-extrabold'>Розклад ДонНУ</h1>
      <div className='flex flex-col gap-3'>
        <Link to={ROUTES.view} className={linkStyles}>👀 Переглянути</Link>
        <Link to={ROUTES.edit} className={linkStyles}>✏️ Редагувати</Link>
        <Link to={ROUTES.panel} className={linkStyles}>🎛 Адмін панель</Link>
      </div>
    </div>
  );
}

export default Home;