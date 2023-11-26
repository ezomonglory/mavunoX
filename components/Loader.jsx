import React from 'react'
import { FadeLoader } from 'react-spinners'

const Loader = () => {
  return (
    <div className='w-full h-screen bg-[#0000008c] flex items-center justify-center z-30 fixed top-0 left-0 '>
        <FadeLoader color="#36d7b7" />
    </div>  
  )
}

export default Loader