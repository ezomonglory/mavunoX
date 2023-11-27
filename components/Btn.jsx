"use client";
import React from "react";
import { ClipLoader } from "react-spinners";

const Btn = ({ text, disabled, handleClick, variant, load, setLoad }) => {
	if (variant === "outline") {
		return (
			<div
				className={`${
					disabled
						? "bg-[#DDD]"
						: " border border-[#049600] rounded-[8px] flex items-center justify-center py-[8px] px-[12px] cursor-pointer "
				} rounded-[8px] py-[8px] px-[32px] flex items-center justify-center  `}
				onClick={
					disabled === true
						? () => {}
						: (e) => {
								handleClick(e);
						  }
				}
			>
				<h1 className='text-[#049600] leading-[28px] tracking-[-0.6px] neue500 text-[16px] '>
					{load ? <ClipLoader size={20} color='#fff' /> : text}
				</h1>
			</div>
		);
	} else {
		return (
			<div
				className={`${
					disabled === true ? "bg-[#DDD]" : "bg-[#049600] cursor-pointer "
				} rounded-[8px] h-[48px] px-[32px] flex items-center justify-center  `}
				onClick={
					disabled === true
						? () => {}
						: (e) => {
								handleClick(e);
						  }
				}
			>
				<h1 className='text-white leading-[28px] tracking-[-0.1px] text-[16px]  neue500'>
					{load ? <ClipLoader size={20} color='#fff' /> : text}
				</h1>
			</div>
		);
	}
};

export default Btn;
