import React from 'react'

const LabelledContainer = ({header, icon, children, rounded}) => {
  return (
    <div className={`bg-white  ${rounded ? rounded : "rounded-[8px]"} py-[16px] px-[16px] md:px-[24px] border border-[#E4E4E4]`}>
        <div className='flex space-x-[8px] w-full border border-transparent border-b-[#E4E4E4] mb-[24px] pb-[16px] items-center '>
            {
                icon && (<span>{icon}</span>)
            }

            <h1 className='text-[16px] md:text-[20px] leading-[28px] tracking-[-0.2px] text-[#141414] '> {header} </h1>
        </div>

        {children}
    </div>
  )
}

export default LabelledContainer