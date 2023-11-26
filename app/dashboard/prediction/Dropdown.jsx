"use client";
import React from "react";
import { checkIcon } from "@/SVG";

const Dropdown = ({ header, icon, children, check, show, setShow, setCheck }) => {

	return (
		<div>
			<div
				className='flex justify-between items-center py-[12px] px-[16px] bg-[#F7F7F7] border border-[#E4E4E4] cursor-pointer rounded-[4px]'
				onClick={() => {
					if(show === header) {
                        setShow('')
                    }else{
                        setShow(header);
                        setCheck(false)
                    }
				}}
			>
				<div className='flex space-x-[4px]'>
					{check && <span>{checkIcon}</span>}
					<h1 className='text-[14px] md:text-[18px] neue500 tracking-[-0.2px] leadng-[22px] md:leading-[24px] '>
						{header}
					</h1>
				</div>
				<span>{icon}</span>
			</div>

			{show === header && (
				<div className='border-[2px] border-t-transparent border-dashed p-[24px] '>
					{children}
				</div>
			)}
		</div>
	);
};

export default Dropdown;
