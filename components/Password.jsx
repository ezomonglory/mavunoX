"use client";
import { paasswordOpen, passwordClose } from "@/SVG";
import React, { useState } from "react";

const PasswordInput = ({ label, placeholder, name, handleChange, value }) => {
	const [show, setShow] = useState(false);
	return (
		<div className='flex flex-col space-y-[8px]'>
			<h1 className='text-[#808080] text-[14px] leading-[22px] tracking-[-0.1px]'>
				{label}
			</h1>
			<div className='py-[8px] px-[16px]  bg-white border border-[#E4E4E4] flex justify-between rounded-[8px]'>
				<input
					placeholder={placeholder}
					type={show ? "text" : "password"}
					name={name}
					onChange={(e) => handleChange(e)}
					value={value && value}
					className='border-none outline-none w-full neue400 text-[14px] tracking-[-0.24px] leading-[22px] '
				/>

				<span
					onClick={() => {
						setShow(!show);
					}}
				>
					{show ?  passwordClose : paasswordOpen}
				</span>
			</div>
		</div>
	);
};

export default PasswordInput;
