"use client"
import Sidebar from "@/components/Sidebar";
import React, { useState } from "react";
import DashHeader from "./DashHeader";

const Dashlayout = ({ children, weather }) => {
    const [show, setShow] = useState(false)
	return (
		<div className='flex layout'>
			<Sidebar show={show} setShow={setShow} weather={weather} />
			<DashHeader show={show} setShow={setShow} />
			<div className=' pt-[40px] px-[16px] sm:px-[32px] lg:px-[32px] 2xl:px-[64px] h-screen overflow-auto scroll-hidden padd w-full'>
				{children}
			</div>
		</div>
	);
};

export default Dashlayout;
