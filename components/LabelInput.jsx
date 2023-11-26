"use client";
import React from "react";

const LabelInput = ({ label, placeholder, icon, type, name, handleChange, value }) => {
	return (
		<div className='flex flex-col space-y-[8px]'>
			<h1 className='text-[#808080] text-[14px] leading-[22px] tracking-[-0.1px]'>
				{label}
			</h1>
			<div className='py-[8px] px-[16px]  bg-white border border-[#E4E4E4] flex justify-between rounded-[8px]'>
				<input
					placeholder={placeholder}
                    type={type ? type : 'text'}
                    name={name}
                    onChange={(e)=> handleChange(e)}
                    value={value && value}
					className='border-none outline-none w-full'
				/>
				<span>{icon}</span>
			</div>
		</div>
	);
};

export default LabelInput;
