/* eslint-disable @next/next/no-img-element */
import { user } from "@/SVG";
import { formatDate, getSeason } from "@/functions";
import React, { useEffect, useState } from "react";

const Header = () => {
	const [userData, setUserData] = useState();	
	let date;
	let weather;
	{
		date = formatDate(Date.now());
	}

	{
		date && (weather = getSeason(date));
	}
	useEffect(() => {
		const user = JSON.parse(window.localStorage.getItem("userData"));
		if (user) {
			setUserData(user);
		}
	}, []);
	return (
		<div className='fixed w-full top-0 flex items-center justify-between bg-white pt-[24px] pb-[16px] px-[16px] md:px-[48px]'>
			<div className='flex space-x-[16px] items-center '>
				<img
					src='/images/logo.svg'
					className='w-[111px] md:w-[150px]'
					alt='logo'
				/>
				<div className='py-[4px] px-[12px] hidden border border-[#8B4513] text-[#8B4513] rounded-[8px] md:flex items-center justify-center '>
					{weather} ‘23
				</div>
			</div>

			<div className='md:flex space-x-[8px] items-center '>
				<span className=''> {user} </span>
				<h1 className='text-[18px] hidden md:block '>{userData?.fullname}</h1>
			</div>
		</div>
	);
};

export default Header;
