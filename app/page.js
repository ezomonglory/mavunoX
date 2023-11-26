"use client";
import Btn from "@/components/Btn";
import LabelInput from "@/components/LabelInput";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
	const [load, setLoad] = useState(false);
	const [formData, setFormData] = useState({
		email: "",

		password: "",
	});

	const router = useRouter();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		console.log(formData);
	};
    
    const handleLogin = async () => {
        setLoad(true)
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_DB_URL}/auth/login`, formData)
            console.log(res)
            window.localStorage.setItem('userData', JSON.stringify(res.data.user))
            router.push('/dashboard')
            setLoad(false)
        } catch (error) {
            console.log(error)
            setLoad(false)
        }

    }

	return (
		<div className=' md:p-[32px] flex w-full items-center h-screen md:h-full '>
			<div
				className='w-full hidden md:block md:w-[50%] rounded-[26px] relative  h-[960px] '
				style={{
					backgroundImage: "url('/images/farmLady.png')",
					backgroundSize: "cover",
					backgroundPosition: "cover",
				}}
			>
				{/* <img
					width='100%'
					src='/images/farmLady.png'
					alt='farm lady'
					className=' top-0 left-0 '
				/> */}

				<div className='absolute bottom-0 left-0 w-full  pb-[74px] px-[56px] flex flex-col space-y-[24px] '>
					<h1 className='text-[20px] 2xl:text-[30px] leading-[38px] tracking-[-0.1px] neue500 text-white '>
						“ It was a game-changer for my gardening journey! with the
						cutting-edge planting and harvesting prediction system, I have
						experienced bountiful yields.
					</h1>

					<div>
						<h2 className='text-white text-[16px] 2xl:text-[18px] leading-[28px] tracking-[-0.1px] neue500 '>
							Blessing Ojadua
						</h2>
						<h2 className='text-white text-[12px] wxl:text-[14px] leading-[22px] tracking-[-0.1px] neue400 '>
							Local Commercial Farmer
						</h2>
					</div>
				</div>
			</div>

			<div className=' w-full md:w-[50%] px-[16px] md:px-[42px] xl:px-[120px] '>
				<div className='flex flex-col space-y-[24px]'>
					<img src='/images/logo.jpg' className='w-[111px] md:w-[154px] ' />

					<div>
						<h1 className='text-[#141414] neue500 leading-[46px] tracking-[-0.5px] text-[30px] md:text-[38px] '>
							Welcome back
						</h1>
						<h2 className='text-[#373737] text-[16px] neue500 tracking-[-0.5px] leading-[24px]'>
							{" "}
							please enter your details.{" "}
						</h2>
					</div>

					<div className='flex flex-col space-y-[20px]'>
						<LabelInput label='Email' name='email' handleChange={handleChange} />
						<div>
							<LabelInput label='Password' type='password' name='password' handleChange={handleChange}  />
							<h2 className='text-[#121212] neue500 leading-[22px] tracking-[-0.1px] text-[14px] mt-[4px] '>
								Forgot Password?
							</h2>
						</div>
					</div>
				</div>
				<div className='mt-[48px]  '>
					<Btn text='Log In' load={load} setLoad={setLoad} handleClick={handleLogin}  />
					<h2 className='text-[14px] leading-[22px] tracking-[-0.1px] neue400 text-[#121212] text-center mt-[12px]'>
						Dont have an account?{" "}
						<Link href='/signup' className='neue500'>
							Sign up for free
						</Link>
					</h2>
				</div>
			</div>
		</div>
	);
};

export default Page;
