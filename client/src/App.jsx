import React, { useContext } from 'react'
import {Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Application from './pages/Application'
import ApplyJob from './pages/ApplyJob'
import RecruiterLogin from './components/RecruiterLogin'
import { AppContext } from './context/AppContext'
import AddJob from './pages/AddJob'
import ManageJob from './pages/ManageJob'
import Dashboard from './pages/Dashboard'
import ViewApplications from './pages/ViewApplication'
import 'quill/dist/quill.snow.css' 
import { ToastContainer } from 'react-toastify';


const App = () => {
  const {showRecruiterLogin,companyToken}= useContext(AppContext);
  return (
    <div>
     {showRecruiterLogin && <RecruiterLogin/> }
     <ToastContainer />
      <Routes>
        <Route path='/' element={<Home/>}  /> 
        <Route path='/apply-job/:id' element={<ApplyJob/>}  /> 
        <Route path='/applications' element={<Application/>}  /> 
        <Route path='/dashboard' element={<Dashboard/>}>

        {companyToken ? <>
        
          <Route path='add-job' element={<AddJob/>} />
         <Route path='manage-job' element={<ManageJob/>} />
         <Route path='view-applications' element={<ViewApplications/>} />
        </>:null}
        
        </Route>

      </Routes>
    </div>
  )
}

export default App
