import LabelledContainer from "@/components/LabelledContainer";
import React from "react";
import Recommendations from "./Recommendations";
import { backArrGreen } from "@/SVG";

const RecMobile = ({setShowRecMobile}) => {
	return (
		<div className='w-full block md:hidden fixed top-[80px] w-screen h-screen bg-white z-[30] !ml-0 '>

                <div className="flex space-x-[4px] px-[16px] items-center mt-[8px] mb-[42px]"
                onClick={()=>{
                    setShowRecMobile(false)
                }}
                >
                    <span> {backArrGreen} </span>
                    <h1 className="text-[#049600] text-[14px] leading-[22px] tracking-[-0.2px]  ">Back to result</h1>
                </div>


			<LabelledContainer header='Recommendations'>
				<Recommendations header='pH Scale'></Recommendations>
			</LabelledContainer>
		</div>
	);
};

export default RecMobile;

