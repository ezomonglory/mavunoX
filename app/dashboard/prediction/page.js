"use client";
import {
	backArrGreen,
	dropDownIconBlack,
	dropDownIconGray,
	locationIcon,
} from "@/SVG";
import React, { useState } from "react";
import Dropdown from "./Dropdown";
import Header from "@/components/Header";
import LabelSelect from "../../../components/LabelSelect";
import { countries, crops } from "@/data";
import LabelInput from "../../../components/LabelInput";
import RequiredInfoDropDown from "./RequiredInfoDropDown";
import AdvancedInfoDropDown from "./AdvancedInfoDropDown";
import { useRouter } from "next/navigation";

const Page = () => {
    const [show, setShow] = useState('')
    const [data, setData] = useState({})
    const router = useRouter()
	return (
		<div className='flex justify-center w-full bg-[#F6F5F8] h-full min-h-screen pt-[106px]'>
			<Header />
			<div className='flex space-y-[16px] flex-col w-full md:w-[70%] xl:w-[50%] mx-auto px-[16px] '>
				<h1 className='text-[#049600] tracking-[-0.2px] leading-[22px] inline-flex text-[14px] md:text-[16px] cursor-pointer w-fit '
                onClick={()=>{
                    router.push('/dashboard')
                }}
                >
					<span> {backArrGreen} </span> Back to dashboard
				</h1>

				<h1 className='text-[#606060] md:text-[#141414] text-[14px] md:text-[30px] font-[500] tracking-[-0.5px] leading-[38px] uppercase md:capitalize '>
					New Prediction
				</h1>

				<div className='bg-white rounded-[4px] py-[26px] px-[12px] md:px-[32px] flex flex-col space-y-[24px] md:space-y-[32px]'>
				<RequiredInfoDropDown show={show} data={data}  setData={setData}  setShow={setShow} />
                <AdvancedInfoDropDown show={show} setShow={setShow} data={data}  setData={setData} />
				</div>
			</div>
		</div>
	);
};

export default Page;
