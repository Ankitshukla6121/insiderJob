import express from 'express'
import { ChangeJobApplicationStatus, changeVisibility, getCompanyData, getCompanyPostedJobs, getCompnayJobApplications, loginCompany, postJob, registerCompany } from '../controllers/companyController.js'
import upload from '../config/multer.js'
import { protectCompany } from '../middleware/authMiddleware.js'
const router = express.Router()

// Register a company

router.post('/register', upload.single('image') ,registerCompany)

//company login

router.post('/login', loginCompany)

// get company data

router.get('/company',protectCompany,getCompanyData)

// post a job

router.post('/post-job',protectCompany, postJob)

// get applicants

router.get('/applicants',protectCompany,getCompnayJobApplications)

//get company job list

router.get('/list-jobs',protectCompany, getCompanyPostedJobs)


// change application status

router.post('/change-status', protectCompany,ChangeJobApplicationStatus)

// change application visibility

router.post('/change-visibility',protectCompany,changeVisibility)

export  default router