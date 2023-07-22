import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import Template from '../Template/Template'
import { MyContext } from '../../context/MyProvider'

export default function DetailContact() {
    const [data, setData] = useState(null)
    const {id} = useParams()
    const navigate = useNavigate()
    const context = useContext(MyContext)
    
    useEffect(() => {
        if(!data){
            getDetailPost()
        }
    }, [])

    const getDetailPost = async () => {
        const result = await axios.get(`/api/contacts/detail/${id}`, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        if(result.data.success){
            setData(result.data.data)
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
                const result = await axios.delete(`/api/contacts/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`
                    }
                })
                if(result.data.success){
                    context.setData({...context, dataContacts:context.dataContacts.filter(res => res.id != data.id)})
                    Swal.fire(
                      'Berhasil',
                      `Kontak ini berhasil dihapus`,
                      'success'
                    )

                    navigate("/contacts")
                }
            }
          })
    }

    if(data)
  return (
    <Template>
        <div className="max-w-2xl mx-auto">
            <div className='flex items-center gap-2'>
            <button onClick={() => navigate(`/contacts/${data.id}/edit`)} className='bg-blue-500 rounded-md py-2 px-3 text-sm text-white font-bold hover:bg-blue-600 transition-colors duration-300'>Edit Contact</button>
            <button onClick={() => handlerDelete(data.id)} className='bg-red-500 rounded-md py-2 px-3 text-sm text-white font-bold hover:bg-red-600 transition-colors duration-300'>Delete Contact</button>
            </div>
            <div className='mt-2 p-8 rounded-md mx-auto space-y-12 bg-white shadow-md'>
                <div className="space-y-8 dark:bg-gray-800 dark:text-gray-50">
                    <div className="space-y-2">
                        <h1 className='uppercase tracking-wider text-sm text-zinc-600 mb-5'>Detail Contact</h1>
                        <div>
                            <h1 className='text-zinc-500 text-sm tracking-wider'>Nama</h1>
                            <p className='font-bold'>{data.nama}</p>
                        </div>
                        <div>
                            <h1 className='text-zinc-500 text-sm tracking-wider'>Email</h1>
                            <p className='font-bold'>{data.email}</p>
                        </div>
                        <div>
                            <h1 className='text-zinc-500 text-sm tracking-wider'>Nomor Telepon</h1>
                            <p className='font-bold'>({data.dial}) {data.nomor_telepon}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Template>
  )

  else
  return (
    <div>
        Searching
    </div>
  )
}