import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiTrash, HiViewGrid } from "react-icons/hi"
import Swal from 'sweetalert2'
import Template from '../Template/Template'
import { FaTable } from 'react-icons/fa'
import { MyContext } from '../../context/MyProvider'

export default function HalamanContacts() {
    const navigate = useNavigate()
    const context = useContext(MyContext)
    const [mode, setMode] = useState("grid")
    const [datatimeout, setDatatimeout] = useState(null)
    const [allData, setAllData] = useState(null)

    const handlerQuery = (value) => {
        clearTimeout(datatimeout)
        let getdatatimeout = setTimeout(async () => {
            context.setData({...context, dataContacts:null})
            if(value != ""){
                const searchResult = await axios.get(`/api/contacts/search?keyword=${value}`, {
                    headers: {
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                    }
                })
                console.log(searchResult);
                context.setData({...context, dataContacts:searchResult.data.data})
            }else{
                context.setData({...context, dataContacts:allData})
            }
        }, 1000);
        setDatatimeout(getdatatimeout)
    }

    useEffect(() => {
        if(!context.dataContacts){
            getAllContact()
        }
    }, [])


    const getAllContact = async () => {
        const result = await axios.get("/api/contacts", {
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        if(result.data.success){
            console.log(result);
            setAllData(result.data.data)
            context.setData({...context, dataContacts:result.data.data})
        }
    }

    const handlerDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then(async (result) => {
            if (result.isConfirmed) {
                const result = await axios.delete(`/api/contacts/${id}`)
                if(result.data.success){
                    const newArr = data.filter(res => res.id != id)
                    setData(newArr)
                    Swal.fire(
                      'Deleted!',
                      'Kontak berhasil dihapus',
                      'success'
                    )
                }
            }
          })
    }

  return (
    <Template>
        <div>
            <div className='md:flex space-y-2 md:space-y-0 items-center justify-between'>
                <div>
                    <h1 className='text-base text-zinc-600 mb-1'>List Contacts</h1>
                    <input type="text" className='input-search' onChange={(e) => handlerQuery(e.target.value)} placeholder='Cari nama atau email'/>
                </div>

                {/* <div className='flex items-center gap-2'>
                    <button onClick={() => setMode("table")} className={`${mode == "table" && "bg-blue-200"} hover:bg-blue-300 transition-colors duration-300 ease-in-out text-xl w-9 h-9 flex items-center justify-center rounded-md`}>
                        <FaTable />
                    </button>
                    <button onClick={() => setMode("grid")} className={`${mode == "grid" && "bg-blue-200"} hover:bg-blue-300 transition-colors duration-300 ease-in-out text-xl w-9 h-9 flex items-center justify-center rounded-md`}>
                        <HiViewGrid />
                    </button>
                </div> */}
                <button onClick={() => navigate("/contacts/create")} className='btn-primary'>Add Contact</button>
            </div>

                {
                    context.dataContacts ?
                    context.dataContacts.length > 0 ?
                        <div className='grid grid-cols-1 md:grid-cols-5 gap-5 mt-5'>
                            {
                                context.dataContacts.map((item, key) => {
                                    return (
                                        <div key={key} className='bg-white rounded-md relative shadow-md overflow-hidden'>
                                            <div className='h-10 bg-gradient-to-br from-blue-600 via-sky-500 to-blue-300 flex'>
                                                <h1 className='self-end ml-14 text-white capitalize font-bold'>{item.nama.length > 20 ? item.nama.substring(0, 20)+"...":item.nama}</h1>
                                            </div>
                                            <div className='p-2.5'>
                                                <span className='bg-blue-300 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold uppercase -mt-10'>{item.nama.charAt(0)}</span>
                                                <div onClick={() => navigate(`/contacts/${item.id}`)} className=' cursor-pointer'>
                                                    <h1 className='font-bold text-zinc-600'>{item.dial} {item.nomor_telepon}</h1>
                                                    <div className='flex items-center justify-between'>
                                                        <p className='text-zinc-600 text-sm'>{item.email}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    )
                                })
                            }
                        </div>
                    :
                        <div className='text-center w-full py-10'>
                            <h1 className='text-red-500 font-bold'>No Data Available</h1>
                        </div>
                    :
                    <div className='grid grid-cols-5 gap-5 mt-5'>
                        {
                            Array(10).fill("test").map((item, key) => {
                                return (
                                    <div key={key} className='h-56 w-full bg-zinc-300 rounded-md shadow-md animate-pulse'>
        
                                    </div>
                                )
                            })
                        }
                    </div>
                }
                
        </div>
    </Template>
  )
}
