"use client";
import { cloudIcon, locationIcon, plusICon } from "@/SVG";
import Sidebar from "@/components/Sidebar";
import React, { useEffect, useState } from "react";
import DenseTable from "./Table";
import StickyHeadTable from "./Table";
import Btn from "@/components/Btn";
import Dashlayout from "./Dashlayout";
import { formatDate, getSeason } from "@/functions";
import { useRouter } from "next/navigation";

const Page = () => {
	const [userData, setUserData] = useState();
    const router = useRouter()
	let date;
    let weather;
	{
		date = formatDate(Date.now());
	}
    
    {date && (weather = getSeason(date))}
	useEffect(() => {
		const user = JSON.parse(window.localStorage.getItem("userData"));
		if (user) {
			setUserData(user);
		}
	}, []);
	return (
		<Dashlayout weather={weather} >
			<div className='md:flex items-center justify-between mb-[44px] hidden  '>
				<div className='flex items-center space-x-[8px]'>
					<span> {locationIcon} </span>
					<h2 className='text-[#5B5B5B] text-[16px] capitalize tracking-[-0.1px] neue500 leading-[24px] '>
						{userData?.state}, {userData?.country}
					</h2>
				</div>
				<div className='flex space-x-[16px] items-center '>
					<h2 className='text-[#5B5B5B] text-[16px] tracking-[-0.1px] neue500 leading-[24px] '>
						{date}
					</h2>
					<div className='flex space-x-[8px] items-center'>
						<span> {cloudIcon} </span>
						<h2 className='text-[#5B5B5B] text-[16px] tracking-[-0.1px] neue500 leading-[24px] '>
							{weather}
						</h2>
					</div>
				</div>
			</div>

			<div>
				<h1 className='text-[#141414] text-[24px] tracking-[-0.5px] leading-[32px] neue500 capitalize'>
					Welcome {userData?.fullname}
				</h1>
				<h2 className='text-[#5B5B5B]  tracking-[-0.5px] leading-[24px] text-[16px] neue400 '>
					What are we planting today?
				</h2>

				<div className='bg-[#FCF1E9] rounded-[6px] py-[8px] px-[16px] hidden sm:block border border-[#8B4513] mt-[16px] '>
					<h1 className='text-[#8B4513] text-[16px] leading-[24px] tracking-[-0.1px] neue400 '>
						Embrace the winter magic, <span className="capitalize">{userData?.fullname}</span>! It is prime time to sow the
						seeds of a bountiful harvest. Now, let us seize the season and plant
						some winter wonders together
					</h1>
				</div>
			</div>

			<div className='mt-[32px] border rounded-[8px] w-screen sm:w-full ml-[-16px] mr-[-16px] sm:mx-0 '>
				<div className='flex flex-col md:flex-row space-y-[24px] md:space-y-0 md:items-center justify-between border border-transparent border-b-[#e5e7eb] py-[12px] md:py-[20px] px-[16px] md:px-[24px]  '>
					<div>
						<h1 className='text-[#141414] text-[18px] leading-[28px] tracking-[-0.1px] '>
							Prediction
						</h1>
						<h1 className='text-[14px] tracking-[-0.1px] leading-[20px] neue400 text-[#5B5B5B] '>
							<span className='text-[#141414] neue500 '>11 Active</span>, ensure
							to keep track of them.
						</h1>
					</div>
					<div className='flex items-center space-x-[4px] bg-[#049600] cursor-pointer py-[10px] pl-[12px] pr-[16px] rounded-[8px] w-fit'
                    onClick={()=>{
                        router.push('/dashboard/prediction')
                    }}
                    >
						{" "}
						<span> {plusICon} </span>
						<h1 className='text-white leading-[20px] tracking-[-0.1px] text-[14px]'>
							Add new
						</h1>
					</div>
				</div>
				<div className='w-full overflow-x-auto scroll-hidden '>
					<StickyHeadTable />
				</div>
			</div>
		</Dashlayout>
	);
};

export default Page;
