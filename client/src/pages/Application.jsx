import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { assets, jobsApplied } from '../assets/assets'
import moment from 'moment'
import Footer from '../components/Footer'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useAuth, useUser } from '@clerk/clerk-react'
import axios from 'axios'
import { toast } from 'react-toastify'
const Application = () => {

  const {user}= useUser()
  const {getToken}= useAuth();

   const [isEdit, setisEdit]= useState(false)
   const [resume, setResume]= useState(null)

   const {backendUrl, userData, userApplications,fetchUserData}= useContext(AppContext)

   const updateResume= async () =>{

    try {
      const formData= new FormData()

      formData.append('resume',resume)
      const token = await getToken()

      const {data}= await axios.post(backendUrl+'/api/users/update-resume',
        formData,
        {
          headers:{Authorization:`Bearer ${token}`}
        }
      )
      if(data.success){
        toast.success(data.message)
        await fetchUserData()
       
      }else{
        // toast.error(data.message)
      }
    } catch (error) {
      // toast.error(error.message)
    }
    setisEdit(false)
    setResume(null)
   }
  return (
    <>
      <Navbar/>
      <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
        <h2  className='text-xl font-semibold'>Your Resume</h2>
        <div className='flex gap-2 mb-6 mt-3'>
           {
            isEdit  || userData  && userData.resume === ""? <>
            <label className='flex items-center' htmlFor='resumeUpload'>
              <p className= ' cursor-pointer bg-blue-100 px-4 text-blue-600 px-4 py-2 rounded-lg mr-2 '> {resume? resume.name : "Select resume"}</p>
              <input id='resumeUpload' onChange={e=> setResume(e.target.files[0])} accept='application/pdf' type="file" hidden />
                <img   src={assets.profile_upload_icon} alt="" />
            </label>
            <button onClick={updateResume} className=' cursor-pointer bg-green-100 border border-green-400 rounded-lg px-4 py-2'>Save</button>
            </> :
            <div className='flex gap-2'> 
              <a className='bg-blue-100 text-blue-600 rounded-lg px-4 py-2' href="">
                Resume
              </a>
              <button onClick={() =>setisEdit(true)} className='text-gray-500 cursor-pointer border border-gray-300  rounded-lg px-4 py-2'>
                Edit
              </button>
              </div>

           }
        </div>

        <h2 className='text-xl font-semibold  mb-4'>Job Applied</h2>
        <table className='min-w-full bg-white border border-gray-200 rounded-lg '>
          <thead>
            <tr>
              <th className='py-3 py-4 border-b text-left'>Company</th>
              <th className='py-3 py-4 border-b text-left' >Job Title</th>
              <th className='py-3 py-4 border-b text-left max-sm:hidden'>Location</th>
              <th className='py-3 py-4 border-b text-left max-sm:hidden'>Date</th>
              <th className='py-3 py-4 border-b text-left'>Status</th>
            </tr>
          </thead>
          <tbody>
            {
             userApplications.map((job, index)=>true ? (
                <tr key={index}>
                 <td className='py-3 px-4 flex items-center gap-2 '>
                    <img className='w-8 h-8' src={job.companyId.image}/>
                    {job.companyId.name}
                    
                 </td >
                 <td className='py-2 px-4 '>{job.jobIdtitle}</td>
                 <td  className='py-2 px-4  max-sm:hidden'>{job.jobId.location}</td>
                 <td className='py-2 px-4 ' >{moment(job.date).format('ll')}</td>
                 <td className='py-2 px-4 ' >
                  <span className={`${job.status === 'Accepted' ?'bg-green-100' : job.status==='Rejected' ? 'bg-red-100' : 'bg-blue-100'} px-4 py-1.5 rounded `}>
   

                  {job.status}
                  </span>
                  </td>
                </tr>
              ):(null))
            }
          </tbody>
        </table>
      </div>
      <Footer/>
    </>
  )
}

export default Application
