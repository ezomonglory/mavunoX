import { summerIcon, winterIcon } from '@/SVG'
import React from 'react'

const PredictionPeriod = ({label, icon}) => {

    if (label === "Winter") {
        icon = winterIcon
    } else if (label === "Summer") {
        icon = summerIcon
    }

  return (
    <div className='py-[4px] px-[16px] border border-[#E4E4E4] rounded-[7px] bg-white opacity-80 flex justify-between items-center w-full'>
        <h1 className='text-[#5B5B5B] tracking-[-0.2px] text-[14px] leading-[26px]  '> {label} </h1>
        <span> {icon} </span>
    </div>
  )
}

export default PredictionPeriod