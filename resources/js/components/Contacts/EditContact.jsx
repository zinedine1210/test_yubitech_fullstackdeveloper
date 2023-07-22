import React, { useContext, useEffect, useRef, useState } from 'react'
import { HiChevronDoubleLeft, HiX } from "react-icons/hi"
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom'
import Template from '../Template/Template'
import { MyContext } from '../../context/MyProvider'

export default function EditContact() {
  const context = useContext(MyContext)
  const [options, setOptions] = useState(null)
  const [open, setOpen] = useState(false)
  const [keyword, setKeyword] = useState("")
  const [validation, setValidation] = useState([])
  const [data, setData] = useState(null)
  const navigate = useNavigate()
  const dropRef = useRef(null)
  const {id} = useParams()

  useEffect(() => {
    axios.get("/dial.json").then(res => {
      console.log(res);
      setOptions(res.data)
    })

    if(!data){
      getDetailContact()
    }

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [data]);

  const getDetailContact = async () => {
    const result = await axios.get(`/api/contacts/detail/${id}`, {
      headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`
      }
    })
    console.log(result);
    if(result.data.success){
      result.data.data['dial'] = {dial_code:result.data.data['dial']}
      console.log(result.data.data);
      setData(result.data.data)
    }
  }

  const handleOutsideClick = (event) => {
      if (dropRef.current && !dropRef.current.contains(event.target)) {
          setOpen(false);
      }
  };

  const handlerSubmit = e => {
    e.preventDefault()
    savePost()
  }

  const savePost = async () => {
    let obj = JSON.parse(JSON.stringify(data))
    obj['dial'] = obj['dial']['dial_code']

    try {
      const result = await axios.put(`/api/contacts/${id}`, obj, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
      })

      console.log(result);
      if(result.data.success){
        const updatedData = context.dataContacts.map(res => (res.id == id ? result.data.data : res));
        context.setData({...context, dataContacts:updatedData})
        
        Swal.fire({
          icon:"success",
          title:"Berhasil",
          text:"Kontak berhasil diperbarui"
        })
  
        navigate("/contacts")
      }
    } catch (error) {
      if(error?.response?.data){
        setValidation(error.response.data)
      }
    }
  }

  const handlerSearch = (value) => {
    setData({...data, dial:{dial_code:value}})
    setKeyword(value)
  }

  const handlerChoose = (item) => {
    setData({...data, dial:item})
    setOpen(false)
  }
  

  if(data)
  return (
    <Template>
      <div>
        <button onClick={() => navigate("/contacts")} className='text-blue-500 flex items-center gap-1 mb-2'>
          <HiChevronDoubleLeft />
          Back
        </button>
        <form onSubmit={(e) => handlerSubmit(e)} className='bg-white w-full md:w-1/2 shadow-md rounded-md p-5 h-full'>
            <h1 className='font-bold'>Edit Contact</h1>
            <div className='space-y-3 my-5'>
              <div>
                <label htmlFor="nama" className='text-zinc-600 text-sm mb-1 inline-block'>Nama Kontak <span className='text-red-500'>*</span></label>
                <input type="text" id='nama' required name='nama' value={data.nama} onChange={(e) => setData({...data, nama:e.target.value})} className='input-style w-full' placeholder='Ketikan nama disini...'/>
                {
                    validation.nama && (
                        <p className="text-sm text-red-500">{validation.nama[0]}</p>
                    )
                }
              </div>
              <div>
                <label htmlFor="email" className='text-zinc-600 text-sm mb-1 inline-block'>Email <span className='text-red-500'>*</span></label>
                <input type="text" id='email' name='email' value={data.email} onChange={(e) => setData({...data, email:e.target.value})} className='input-style w-full' placeholder='Ketikan email disini...' required/>
                {
                    validation.email && (
                        <p className="text-sm text-red-500">{validation.email[0]}</p>
                    )
                }
              </div>
              <div>
                <label htmlFor="nomor_telepon" className='text-zinc-600 text-sm mb-1 inline-block'>Nomor Telepon <span className='text-red-500'>*</span></label>
                <div className='relative input-style'>
                  <div ref={dropRef} className='absolute block top-1/2 -translate-y-1/2 pb-0.5 font-bold pl-0 text-blue-500'>
                    <input type="text" placeholder='+---' className='outline-none inline-block bg-inherit w-12' value={data.dial.dial_code} onChange={(e) => handlerSearch(e.target.value)} onFocus={() => setOpen(true)} />
                    <div className={`${open ? "":"hidden"} bg-white shadow-md top-full absolute left-0 w-fit max-h-80 overflow-auto mt-2 z-20`}>
                      {
                        options ?
                        options.filter(res => {
                          if(res?.dial_code != null){
                            if(keyword != ""){
                              if(res.dial_code.includes(keyword)){
                                return res
                              }
                            }else{
                              return res
                            }
                          }
                        }).map((item, key) => {
                          return (
                            <button type='button' onClick={() => handlerChoose(item)} key={key} className='w-full py-2 px-4 hover:bg-blue-100 text-start'>
                              <h1 className='font-bold text-black'>{item.name}</h1>
                              <p className='text-zinc-500 text-sm font-normal'>{item.dial_code}</p>
                            </button>
                          )
                        })
                        :""
                      }
                    </div>
                  </div>
                  <input type="text" id="nomor_telepon" value={data.nomor_telepon} onChange={(e) => setData({...data, nomor_telepon:e.target.value})} className='outline-none ml-14' name="nomor_telepon" pattern="[0-9]{10,15}" required placeholder='895...'/>
                </div>
                {
                    validation.dial && (
                        <p className="text-sm text-red-500">{validation.dial[0]}</p>
                    )
                }
                {
                    validation.nomor_telepon && (
                        <p className="text-sm text-red-500">{validation.nomor_telepon[0]}</p>
                    )
                }
              </div>
            </div>
            <button className='btn-primary'>Submit</button>
        </form>
      </div>
    </Template>
  )
}
