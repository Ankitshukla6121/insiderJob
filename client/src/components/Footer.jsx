import React from 'react'
import { Link} from 'react-router-dom'
import {assets} from '../assets/assets'
const Footer = () => {
  return (
    <div className='container px-4 2xl:px-20 mx-auto flex items-center justify-between gap-4 py- 3 mt-20' >
     <a href="/"> <img width={160} src={assets.logo} alt="" /> </a>
     <Link to='https://github.com/Ankitshukla6121'> <p className='flex-1   pl-4 text-sm text-gray-500 max-sm:hidden  '>Copyright @AnkitShukla.dev | All right reserved.</p></Link>
      <div className='flex gap-2.5'>
      <Link to='https://www.facebook.com/profile.php?id=100089460102686'>
      <img width={38} src={assets.facebook_icon} alt="" />
      </Link> 
      
     < Link to='https://www.instagram.com/aankitshukla04/'>
      <img width={38} src={assets.instagram_icon} alt="" />
      </Link>
     
     
      <Link to='https://x.com/ankitshukla_02'>
      <img width={38} src={assets.twitter_icon} alt="" />
      </Link>
        
        
      </div>
    </div>
  )
}

export default Footer
