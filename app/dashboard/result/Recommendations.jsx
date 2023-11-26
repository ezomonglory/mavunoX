"use client";
import { dropDownIconGray } from "@/SVG";
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
				<span> {dropDownIconGray} </span>
				<h1 className='text-[#373737] text-[16px] tracking-[-0.2px] leading-[28px] '>
					{header}
				</h1>
			</div>

			{show && <div> The current temperature of 25 degrees Celsius is higher than the recommended range of 20-21 degrees Celsius for optimal yield. To improve yield, consider implementing strategies such as shade nets, irrigation, and mulching to regulate temperature and reduce heat stress on crops. {children} </div>}
		</div>
	);
};

export default Recommendations;
