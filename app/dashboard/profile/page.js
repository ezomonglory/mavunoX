"use client";
import React, { useEffect, useState } from "react";
import { cloudIcon, locationIcon, userBig } from "@/SVG";

import Dashlayout from "../Dashlayout";
import { formatDate, getSeason } from "@/functions";
import LabelInput from "@/components/LabelInput";
import LabelSelect from "@/components/LabelSelect";
import { countries } from "@/data";
import Btn from "@/components/Btn";

const Page = () => {
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
		<Dashlayout>
			<div className='w-full'>
				<div className='md:flex items-center justify-between mb-[44px] hidden w-full '>
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
			</div>

			<div className='flex flex-col space-y-[32px] md:w-[50%]'>
				<h1 className='text-[#141414] text-[24px] neue500 leading-[32px] tracking-[-0.5px] '>
					Profile
				</h1>
				<div className='flex flex-col space-y-[24px] '>
					<div className='flex space-x-[24px] '>
						<span> {userBig} </span>
						<div>
							<div className='border border-[#E4E4E4] rounded-full w-fit flex items-center justify-center py-[6px] px-[12px]  '>
								<h1 cllassName='text-[14px] text-[#000] neue500 tracking-[-0.1px] leading-[22px] '>
									Upload Image
								</h1>
							</div>
							<div className='text-[#5B5B5B] text-[14px] leading-[22px] tracking-[-0.1px] '>
								Jpeg, PNG. Max image size 5MB
							</div>
						</div>
					</div>
				</div>
				<div className='flex flex-col space-y-[8px] border border-transparent border-b-[#E4E4E4] pb-[40px]'>
					<LabelInput label='Full Name' />
					<LabelInput label='Email' />
					<LabelSelect label='Country' options={countries} />
					<LabelInput label='State' />
					<LabelInput label='City' />
                    <div className="!mt-[32px] w-fit">
                        <Btn text="Update" disabled={false} />
                    </div>
				</div>

				<div className='flex space-y-[8px] flex-col '>
					<h1 className='text-[#808080] text-[14px] neue400 leading-[22px] tracking-[-0.1px] '>
						Password
					</h1>
					<h1 className='text-[#5B5B5B] text-[16px] leading-[26px] tracking-[-0.1px] neue500  '>
						To enhance your account security, we recommend regularly updating
						your password.
					</h1>
				</div>

				<div className='bg-[#8B4513] py-[10px] px-[16px] w-fit rounded-[8px] mt-[24px] !mb-[40px]'>
					<h1 className='text-white leading-[20px] neue500 tracking-[-0.1px] text-[14px] '>
						Change Password
					</h1>
				</div>
			</div>
		</Dashlayout>
	);
};

export default Page;
