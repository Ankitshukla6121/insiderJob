import {useNavigate} from 'react-router-dom'
import moment from 'moment'

import { useContext, useEffect, useState } from 'react';
import {AppContext} from '../context/AppContext'
import axios from 'axios';
import { toast } from 'react-toastify';
const ManageJob = () => {
  const navigate= useNavigate();

  const [jobs,setJobs]= useState([])
  const {backendUrl, companyToken}= useContext(AppContext)

  // function to fetch company job application data

  const fetchCompanyJobs= async()=>{

    try {
      const {data}= await axios.get(backendUrl+'/api/company/list-jobs',
        {
          headers:{token:companyToken}
        }
      )
      if(data.success){
        setJobs(data.jobsData.reverse())
        console.log(data.jobsData)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // function to change job visibility

  const changeJobVisibility = async (id)=>{
    try {
      const {data}= await axios.post(backendUrl+'/api/company/change-visibility',
        {id},
        {
          headers:{token:companyToken}
        }
      )
      if(data.success){
        toast.success(data.message)
        fetchCompanyJobs()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{

    if(companyToken){
      fetchCompanyJobs()
    }
  },[companyToken])
  return (
    <div  className='container p-4 max-w-5xl'>
     <div className='overflow-x-auto'>
      <table className='min-w-full bg-white border border-gray-200 max-sm:text-sm'>
        <thead>
          <tr>
            <th className='py-2 px-4 border-b text-left max-sm:hidden'>#</th>
            <th  className='py-2 px-4 border-b text-left'>Job Title</th>
            <th className='py-2 px-4 border-b text-left max-sm:hidden'>Date</th>
            <th className='py-2 px-4 border-b text-left max-sm:hidden'>Location</th>
            <th className='py-2 px-4 border-b text-left text-center'>Applicants</th>
            <th className='py-2 px-4 border-b text-left'>Visible</th>
          </tr>
        </thead>
        <tbody>
    {
      jobs.map((job,index)=>(
        <tr className='text-gray-700' key={index}>
           <td className='py-2 px-2 border-b max-sm:hidden'>{index+1}</td>
           <td  className='py-2 px-2 border-b'>{job.title}</td>
           <td className='py-2 px-2 border-b max-sm:hidden'>{moment(job.date).format('ll')}</td>
           <td className='py-2 px-2  border-b max-sm:hidden'>{job.location}</td>
           <td className='py-2 px-2 border-b text-sm'>{job.applicants}</td>
           <td className='py-2 px-2 border-b'><input onChange={()=>changeJobVisibility(job._id)} className='scale-125 ml-4 cursor-pointer ' type="checkbox"  checked={job.visible} /></td>
        </tr>
      ))
    }
        </tbody>
      </table>
     </div>
     <div className='mt-4 flex justify-end'>
      <button onClick={() =>navigate('/dashboard/add-job')} className='bg-black cursor-pointer text-white py-2 px-4 rounded'>
        Add new Job
      </button>
     </div>
    </div>
  )
}

export default ManageJob
