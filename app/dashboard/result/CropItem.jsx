"use client";
import React, { useEffect, useState } from 'react'

const CropItem = ({icon, name, value, max, min, status}) => {
    const [iconShow, setIconShow] = useState(false)
    
    // console.log(value, max, min)
    // console.log(value > max)
    // useEffect( ()=> {
    //     if(value > max || value < min){
    //         console.log("hey")
    //         setIconShow(true)
    //     }
    // }, [])

  return (
    <div className='flex justify-between items-center'>
            <div className='flex space-x-[4px] items-center'>
                <h1 className='text-[#808080] text-[14px] md:text-[16px] tracking-[-0.2px] leading-[28px] '> {name} </h1>
                <span> {status === 0 && icon} </span>
            </div>

            <h1 className='text-[#141414] leading-[28px] tracking-[-0.2px] text-[16px] '> {value} </h1>
    </div>
  )
}

export default CropItem