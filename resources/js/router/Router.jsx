import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from "../components"
import NotFound from '../components/NotFound'
import Login from '../components/Login'
import Register from '../components/Register'
import HalamanContacts from '../components/Contacts'
import EditContact from '../components/Contacts/EditContact'
import CreateContact from '../components/Contacts/CreateContact'
import DetailContact from '../components/Contacts/DetailContact'

export default function Router() {
  return (
    <Routes>
      <Route path='/login' element={ <Login /> }/>
      <Route path='/register' element={ <Register /> }/>

      <Route path='/' element={ <Dashboard /> }/>
      <Route path='/*' element={ <NotFound /> }/>

      <Route path='/contacts' element={ <HalamanContacts /> }/>
      <Route path='/contacts/:id' element={ <DetailContact /> }/>
      <Route path='/contacts/:id/edit' element={ <EditContact /> }/>
      <Route path='/contacts/create' element={ <CreateContact /> }/>
    </Routes>
  )
}
