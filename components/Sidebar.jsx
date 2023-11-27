import React from "react";
import SidebarNav from "./SidebarNav";

const Sidebar = ({ show, setShow, weather }) => {
	return (
       <div >
         <div className={`bg-[#000000ad] hidden ${show && "overlay"} fixed top-0 left-0 h-screen w-screen z-[90]`}
         onClick={()=>{
            setShow(false)
         }}
         ></div>
		<div
			className={`bg-[#FBFCFB] px-[32px] py-[40px] border border-r-[#E4E4E4] border-transparent h-screen w-[280px]  flex-shrink-0 relative ${
				show ? "sidebarMove" : "sidebar"
			}`}
		>
			<div className='flex space-x-[8px]'>
				<img src='/images/logo.svg' className=' md:w-[126px] ' alt='logo' />

				<div className='text-[#8B4513] neueItalic text-[14px] tracking-[-0.2px] leading-[22px] border boder-[#8B4513] rounded-[8px] py-[4px] px-[12px] '>
					{weather} ‘23
				</div>
			</div>

			<div className='flex space-y-[20px] flex-col mt-[40px] '>
				<SidebarNav text='Dashboard' href='/dashboard' />
				<SidebarNav text='Chatbot' href='' />
				<SidebarNav text='My Profile' href='/dashboard/profile' />
				<SidebarNav text='Settings' href='' />
				<SidebarNav text='Help and Support' href='' />
			</div>
            <div className="absolute bottom-2 ">
            <SidebarNav text='Logout' href='/' />
            </div>
		</div>
       </div>
	);
};

export default Sidebar;
