import React, { useContext } from 'react'
import Template from './Template/Template'
import { MyContext } from '../context/MyProvider'

export default function Post() {
  const context = useContext(MyContext)
  return (
    <Template>
      <div>
        <div className='bg-white w-full md:w-1/2 rounded-md p-5 shadow-md'>
          <h1 className='text-xl font-bold'>Hallo,</h1>
          <p className='text-base text-zinc-600'>{context.auth ? context.auth.name :""}</p>
          <p className='text-sm text-zinc-500 mt-5'>ziddanfhdlvy12@gmail.com</p>
        </div>
      </div>
    </Template>
  )
}
