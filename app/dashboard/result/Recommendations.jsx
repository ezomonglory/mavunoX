"use client";
import { dropDownIconGray, rightIconGray } from "@/SVG";
import React, { useState } from "react";

const Recommendations = ({ header, children }) => {
	const [show, setShow] = useState(false);
	return (
		<div className='flex flex-col space-y-[24px]'>
			<div
				className='cursor-pointer flex space-x-[8px] items-center  '
				onClick={() => {
					setShow(!show);
				}}
			>
				<span> {show ? dropDownIconGray : rightIconGray} </span>
				<h1 className='text-[#373737] text-[16px] tracking-[-0.2px] leading-[28px] '>
					{header}
				</h1>
			</div>

			{show && <div>  {children} </div>}
		</div>
	);
};

export default Recommendations;
