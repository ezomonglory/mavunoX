/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
	deleteIcon,
	dropDownIconBlack,
	dropDownIconGray,
	imageIcon,
	locationIcon,
} from "@/SVG";
import Dropdown from "./Dropdown";

import LabelSelect from "../../../components/LabelSelect";
import { countries, crops } from "@/data";
import LabelInput from "../../../components/LabelInput";
import Btn from "@/components/Btn";
import { useDropzone } from "react-dropzone";

const RequiredInfoDropDown = ({ show, setShow, setData }) => {
	const [check, setCheck] = useState(false);
	const [send, setSend] = useState(true);
	const [uploadedImageUrl, setUploadedImageUrl] = useState('');
	const [formData, setFormData] = useState({
		country: "",
		state: "",
		city: "",
		crop: "",
		soil: {
			red: 0,
			green: 0,
			blue: 0,
		},
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		console.log(name, value);
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	useEffect(() => {
		if (
			formData.country !== "" &&
			formData.state !== "" &&
			formData.city !== "" &&
			formData.crop !== "" &&
			uploadedImageUrl !== ""
		) {
			setSend(false);
		} else {
			setSend(true);
		}
	}, [formData]);

	const onDrop = useCallback((acceptedFiles) => {
		const file = acceptedFiles[0];
		const reader = new FileReader();

		reader.onload = function (event) {
			const image = new Image();
			image.src = event.target.result;
			setUploadedImageUrl(image.src);

			image.onload = function () {
				const canvas = document.createElement("canvas");
				const context = canvas.getContext("2d");
				canvas.width = image.width;
				canvas.height = image.height;
				context.drawImage(image, 0, 0, image.width, image.height);

				const imageData = context.getImageData(
					0,
					0,
					image.width,
					image.height,
				).data;

				// Calculate average RGB values
				let totalRed = 0;
				let totalGreen = 0;
				let totalBlue = 0;

				for (let i = 0; i < imageData.length; i += 4) {
					totalRed += imageData[i];
					totalGreen += imageData[i + 1];
					totalBlue += imageData[i + 2];
				}

				const pixelCount = imageData.length / 4;
				const averageRed = Math.round(totalRed / pixelCount);
				const averageGreen = Math.round(totalGreen / pixelCount);
				const averageBlue = Math.round(totalBlue / pixelCount);

				setFormData((prev) => ({
					...prev,
					soil: {
						red: averageRed,
						green: averageGreen,
						blue: averageBlue,
					},
				}));
			};
		};

		reader.readAsDataURL(file);
	}, []);

	const { getRootProps, getInputProps } = useDropzone({ onDrop });

	const handleClick = () => {
		setData({
			R: formData.soil.red,
			G: formData.soil.green,
			B: formData.soil.blue,
			country: formData.country,
			label: formData.crop,
		});
		window.localStorage.setItem('formData', JSON.stringify(formData))
	};

	return (
		<Dropdown
			header='Required Information'
			icon={dropDownIconBlack}
			check={check}
			setCheck={setCheck}
			show={show}
			setShow={setShow}
		>
			<div className='flex flex-col space-y-[20px]'>
				<LabelSelect
					label='Country'
					options={countries}
					name='country'
					selectedValue={formData.country}
					icon={dropDownIconGray}
					handleChange={handleChange}
				/>
				{/* <div> */}
				<LabelInput
					label='State'
					icon={locationIcon}
					name='state'
					value={formData.state}
					handleChange={handleChange}
				/>

				<LabelInput
					label='City'
					icon={locationIcon}
					name='city'
					value={formData.city}
					handleChange={handleChange}
				/>

				<LabelSelect
					label='Crop type'
					options={crops}
					defaultValue='Select crop type'
					handleChange={handleChange}
					selectedValue={formData.crop}
					name='crop'
					icon={dropDownIconGray}
				/>

				<div className='flex flex-col space-y-[8px]  '>
					<h1 className='text-[#808080] text-[14px] leading-[22px] tracking-[-0.1px]'>
						Soil type
					</h1>
					<div
						className='bg-[#fff] rounded-[8px] p-[16px] border border-dashed border-[#CACACA] cursor-pointer h-[200px] flex items-center justify-center overflow-hidden'
						{...getRootProps()}
					>
						<input {...getInputProps()} />
						<div className='flex flex-col items-center space-y-[12px] overflow-hidden '>
							{uploadedImageUrl ? (
								<div className='group rounded-[8px] p-[64px] relative '>
									<img
										src={uploadedImageUrl}
										width='100%'
										alt='uploaded image'
									/>
									<div
										className='group-hover:flex hidden bg-red-600 h-[24px] w-[24px] rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30  items-center justify-center'
										onClick={() => {
											setUploadedImageUrl("");
										}}
									>
										{deleteIcon}
									</div>
								</div>
							) : (
								<>
									<div className='bg-[#F7F7F7] h-[44px] w-[44px] flex items-center justify-center rounded-full '>
										{imageIcon}
									</div>

									<div className=''>
										<h1 className='text-[14px] tracking-[-0.1px] neue500   text-[#353535] '>
											<span className='text-[#049600]'>Click to upload</span>or
											drag and drop
										</h1>
										<h2 className='text-[12px] text-center tracking-[-0.2px] neue400   text-[#353535] '>
											{" "}
											(Jpeg,PNG. Max. File size: 5 MB)
										</h2>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</div>

			<div className='mt-[32px] md:w-fit  '>
				<Btn
					text='Next'
					disabled={send}
					handleClick={() => {
						setCheck(true);
						setShow("Advanced Information(Optional)");
						handleClick();
					}}
				/>
			</div>
		</Dropdown>
	);
};

export default RequiredInfoDropDown;
