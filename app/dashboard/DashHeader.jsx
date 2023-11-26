/* eslint-disable @next/next/no-img-element */
import { menuIcon, user } from '@/SVG'
import React from 'react'

const DashHeader = ({show, setShow}) => {
  return (
    <div className=' w-full  hidden items-center menu justify-between bg-white pt-[24px] pb-[16px] px-[16px] md:px-[48px]'>
        <div className='flex space-x-[16px] items-center '>
            <img src="/images/logo.jpg" className='w-[111px] md:w-[150px]' alt='logo' />
            <div className='py-[4px] px-[12px] hidden border border-[#D2D2D2] rounded-[8px] md:flex items-center justify-center '>
            Winter ‘23
            </div>
        </div>

        <span className='cursor-pointer'
        onClick={()=> {
            setShow(true)
        }}
        >
            {menuIcon}
        </span>

        
    </div>
  )
}

export default DashHeader