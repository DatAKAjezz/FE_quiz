import { TextField } from '@mui/material';
import { useEffect } from 'react'
import { IoSearchOutline } from 'react-icons/io5';

export const Home = () => {

  const token = localStorage.getItem('token');
  const user1 = JSON.parse(localStorage.getItem('user') ?? '')
  const user = user1[0];

  return (
    <div>
      <div className='h-1/5 mt-5 w-full flex '>
        <div className='w-2/3 mx-auto px-10 py-10 flex relative justify-center items-center'>
          <input
            type='text'
            className='text-black bg-slate-200 rounded-3xl w-full h-20 px-4'
            placeholder='Search quizzes, sets, flashsets,...'
          />            
          <IoSearchOutline className='text-black absolute right-14 text-3xl' />
        </div>
      </div>
    </div>
  )
}
