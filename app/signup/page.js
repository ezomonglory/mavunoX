/* eslint-disable @next/next/no-img-element */
"use client";
import { dropDownIconGray, locationIcon } from "@/SVG";
import Btn from "@/components/Btn";
import LabelInput from "@/components/LabelInput";
import LabelSelect from "@/components/LabelSelect";
import PasswordInput from "@/components/Password";
import { countries } from "@/data";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
    const [load, setLoad] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [formData, setFormData] = useState({
        fullname:'',
        email:'',
        country:'',
        state:'',
        city:'',
        password:'',
        confirm_password:''
    })

    const router = useRouter()

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData((prev)=> ({
            ...prev,
            [name]:value
        }))   
        
        console.log(formData)
    }


    useEffect(()=> {
        if(formData.fullname.trim() !== '' && formData.email.trim() !== '' && formData.country.trim() !== '' && formData.state !== '' && formData.city !== '' && formData.password !== '' && formData.confirm_password !== '' )  {
            setDisabled(false)
        }else {
            setDisabled(true)
        }
    }, [formData])

    const sendDetails = async () => {
        setLoad(true)
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_DB_URL}/auth/signup`, formData)
            console.log(response)
            router.push('/')
            setLoad(false)
        } catch (error) {
            console.log(error)
            setLoad(false)
        }
    }


	return (
        <div className=' md:p-[32px] flex w-full items-center h-full py-[40px] '>
        <div
            className='w-full hidden md:block md:w-[50%] rounded-[26px] relative  h-[960px] '
            style={{
                backgroundImage:"url('/images/farmLady.png')",
                backgroundSize:'cover',
                backgroundPosition:'cover',
            }}
        >			

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

			<div className=' w-full md:w-[50%] px-[16px] md:px-[42px] xl:px-[120px]  '>
				<div className='flex flex-col space-y-[24px]'>
					<img src='/images/logo.svg' className='w-[111px]  md:w-[154px] ' />

					<div className='flex flex-col space-y-[32px]'>
						<div>
							<h1 className='text-[#141414] neue500 leading-[46px] tracking-[-0.5px] text-[30px] md:text-[38px] '>
								Create an account
							</h1>
							<h2 className='text-[#373737] text-[16px] neue400 tracking-[-0.5px] leading-[24px]'>
								{" "}
								Welcome, lets get started.{" "}
							</h2>
						</div>

						<div className='flex flex-col space-y-[20px]'>
							<LabelInput label='Full Name' handleChange={handleChange} name='fullname' />
							<LabelInput label='Email' handleChange={handleChange} name='email' />
                            <LabelSelect label="Country" handleChange={handleChange} name='country' options={countries}  icon={dropDownIconGray} />
							<LabelInput label='State' handleChange={handleChange} name='state' />
							<LabelInput label='City' handleChange={handleChange} name='city' />
							<PasswordInput label='Password' handleChange={handleChange} name='password' />
							<PasswordInput label='Confirm Password' handleChange={handleChange} name='confirm_password' />

							
						</div>
					</div>
				</div>
				<div className='mt-[48px]  '>
					<Btn text='Create Account' load={load} setLoad={setLoad} handleClick={sendDetails} disabled={disabled} />
					<h2 className='text-[14px] leading-[22px] tracking-[-0.1px] neue400 text-[#121212] text-center mt-[12px]'>
						Already have an account?
						<Link href='/' className='neue500'>
							Sign In
						</Link>
					</h2>
				</div>
			</div>
		</div>
	);
};

export default Page;
