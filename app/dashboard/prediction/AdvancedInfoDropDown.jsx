"use client";
import React, { useState } from "react";
import { dropDownIconBlack, infoIconGray } from "@/SVG";

import Dropdown from "./Dropdown";

import LabelInput from "../../../components/LabelInput";
import Btn from "@/components/Btn";
import axios from "axios";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";

const AdvancedInfoDropDown = ({ show, setShow, data, setData }) => {
	const [check, setCheck] = useState(false);
	const [loader, setLoader] = useState(false);
	const router = useRouter();

	const handleSkip = async () => {
		setLoader(true);
		console.log(data);
		try {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_BASE_URL}/get_first_results/`,
				data,
			);
			console.log(response);
			console.log("jjjo");
			router.push("/dashboard/result");
			window.localStorage.setItem("phData", JSON.stringify(response.data));
			setLoader(false);
		} catch (error) {
			console.log(error);
			console.log("o");
			setLoader(false);
		}
	};

	

	return (
		<Dropdown
			header='Advanced Information(Optional)'
			icon={dropDownIconBlack}
			check={check}
			setCheck={setCheck}
			setShow={setShow}
			show={show}
		>
			<div className='flex flex-col space-y-[20px]'>
				<LabelInput label='Soil pH level' icon={infoIconGray} />
				{/* <LabelInput label='Soil humidity' icon={infoIconGray} />
				<LabelInput label='Environment humidity' icon={infoIconGray} /> */}
				<LabelInput label='Water Availabilty' icon={infoIconGray} />
				{/* <LabelInput label='Temperature' icon={infoIconGray} /> */}
			</div>
			<div className='mt-[32px] w-full md:w-fit mb-[20px] flex space-x-[16px] '>
				<div className='w-1/2'>
					<Btn
						text='Skip'
						variant='outline'
						disabled={false}
						handleClick={() => {
							handleSkip();
						}}
					/>
				</div>
				<div className='w-1/2'>
					<Btn
						text='Submit'
						disabled={true}
						handleClick={() => {
							console.log("hey");							
						}}
					/>
				</div>
			</div>
			{loader && <Loader />}
		</Dropdown>
	)
};

export default AdvancedInfoDropDown;
