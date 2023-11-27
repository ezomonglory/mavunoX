import { cancelIcon } from "@/SVG";
import Btn from "@/components/Btn";
import React from "react";

const RecModal = ({ setShowRecModal, children }) => {
	return (
		<div>
			<div
				className='fixed top-0 left-0 h-screen w-screen z-[40] bg-[#0000009d]'
				onClick={() => {
					setShowRecModal(false);
				}}
			></div>
			<div className='rounded-[16px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  z-50 md:w-[50%]'>
				<div className='bg-white flex items-center justify-between p-[16px]'>
					<h1 className='text-[#373737] text-[16px] neue400 leading-[24px] tracking-[-0.2px] '>
						Recommendation
					</h1>
					<span>{cancelIcon}</span>
				</div>
				<div className='px-[16px] py-[24px] bg-[#F9F9F9] border border-transparent border-y-[#E4E4E4]'></div>
				<div className='flex justify-end bg-white p-[16px]'>
					<Btn text='Okay' handleClick={()=> {setShowRecModal(false)}} />
				</div>
			</div>
		</div>
	);
};

export default RecModal;
