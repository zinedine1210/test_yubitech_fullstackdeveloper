import React, { useContext, useEffect, useState } from 'react'
import { FaGithub, FaHome, FaNewspaper, FaSignOutAlt, FaTable, FaUser } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { MyContext } from '../../context/MyProvider'
import { HiMenuAlt3, HiX } from 'react-icons/hi';

export default function Template({children}) {
  const context = useContext(MyContext)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const getToken = JSON.parse(localStorage.getItem("token"))
    if(getToken){
      if(!context.auth){
        getMe(getToken)
      }
    }else{
      navigate("/login")
    }
  }, [context.auth])
  
  const getMe = async (token) => {
    try {
      const result = await axios.post("/api/auth/me?token="+token)
      console.log("me", result);
      if(result.data.success){
        context.setData({...context, auth:result.data.data})
      }
    } catch (error) {
      navigate("/login")
      localStorage.removeItem("token")
    }
  }

  const handlerLogout = async () => {
    const getToken = JSON.parse(localStorage.getItem("token"))
    const result = await axios.post("/api/auth/logout?token="+getToken)
    console.log("logout", result);
    context.setData({...context, auth:null, dataContacts:null})
    localStorage.removeItem("token")
    navigate("/login")
  }

  const navigate = useNavigate()

  const menu = [
    {
      name:"Home",
      link:"/",
      icon:<FaHome className='text-zinc-500'/>
    },
    {
      name:"Contacts",
      link:"/contacts",
      icon:<FaUser className='text-zinc-500'/>
    }
  ]

  return (
    <div className='flex'>
      <aside class={`${open ? "translate-x-0 opacity-100":"-translate-x-full opacity-0 md:opacity-100 md:translate-x-0"} transition-all duration-300 ease-in-out fixed top-0 left-0 md:relative z-20 flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700`}>
          <a href="#">
            <h1 className='text-blue-500 text-xl font-bold'>Zinedine Ziddan</h1>
            <p className='text-sm text-zinc-500'>Test Fullstack Developer</p>
          </a>

          <div class="flex flex-col justify-between flex-1 mt-6">
              <nav class="flex-1 -mx-3 space-y-3">

                  <div className='space-y-2'>
                    {
                      menu.map((item, key) => {
                        return (
                          <button onClick={() => navigate(item.link)} key={key} class="w-full text-start flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                              {item.icon}
                              <span class="mx-2 text-sm font-medium">{item.name}</span>
                          </button>
                        )
                      })
                    }
                  </div>
              </nav>

              <div class="mt-6">

                  <div class="flex items-center justify-between mt-6">
                      <a href="#" class="flex items-center gap-x-2">
                          <span className='w-9 h-9 text-2xl flex uppercase rounded-full font-bold items-center justify-center bg-blue-100 text-blue-500'>
                            {context.auth ? context.auth.name.charAt(0) :""}
                          </span>
                          <span class="text-sm font-medium text-gray-700 dark:text-gray-200">{context.auth ? context.auth.name.length > 10 ? context.auth.name.substring(0, 10)+"..." : context.auth.name :""}</span>
                      </a>
                      
                      <button onClick={() => handlerLogout()} class="text-gray-500 transition-colors duration-200 rotate-180 dark:text-gray-400 rtl:rotate-0 hover:text-blue-500 dark:hover:text-blue-400">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                          </svg>
                      </button>
                  </div>
              </div>
          </div>
      </aside>
      <div className='relative w-full'>
        <div className='absolute top-0 left-0 py-3 w-full bg-white shadow-md px-5'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <div className='flex items-center gap-2'>
                <span className='w-9 h-9 text-2xl flex uppercase rounded-full font-bold items-center justify-center bg-blue-100 text-blue-500'>
                  {context.auth ? context.auth.email.charAt(0) :""}
                </span>
                <div>
                  <h1 className='text-sm capitalize'>{context.auth ? context.auth.name ?? "Guest" :""}</h1>
                  <p className='text-xs text-zinc-500'>{context.auth ? context.auth.email :""}</p>
                </div>
              </div>
            </div>

            <button onClick={() => setOpen(!open)} className='md:hidden'>
              {
                open ? 
                <HiX className='text-xl'/>
                :
                <HiMenuAlt3 className={'text-xl'} />
              }
            </button>


            <button onClick={() => handlerLogout()} className='hidden md:flex items-center gap-2 text-red-500 hover:bg-red-100 text-sm py-2 px-4 rounded-md transition-colors duration-300'>
              <FaSignOutAlt className='text-red-500'/>
              Logout
            </button>
          </div>
        </div>
        <div className='bg-zinc-100 h-screen min-h-screen w-full overflow-auto'>
            {
              context.auth && (
                <div className='py-20 px-5'>
                  {children}
                </div>
              )
                
            }
        </div>
      </div>
    </div>
  )
}
