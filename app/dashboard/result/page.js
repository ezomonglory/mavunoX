"use client";
import Btn from "@/components/Btn";
import LabelledContainer from "@/components/LabelledContainer";
import React, { useEffect, useState } from "react";
import CropItem from "./CropItem";
import Header from "@/components/Header";
import PredictionPeriod from "./PredictionPeriod";
import Recommendations from "./Recommendations";
import {
	calenderIcon,
	cropPredictionIcon,
	cropResultIcon,
	dangerIcon,
	summerIcon,
	winterIcon,
} from "@/SVG";
import DatePickers from "@/components/DatePicker";
import Loader from "@/components/Loader";
import axios from "axios";
import Link from "next/link";
import { calculatePlantingDate, formatDate, getSeason } from "@/functions";
import GradientProgressBar from "@/components/GradientProgressBar";
import RecMobile from "./RecMobile";

const Page = () => {
	const [data, setData] = useState();
	const [secondData, setSecondData] = useState();
	const [loader, setLoader] = useState(false);
	const [form, setForm] = useState();
	const [plantingDate, setPlantingDate] = useState();
	const [harvestDate, setHarvestDate] = useState();
	const [showRecMobile, setShowRecMobile] = useState(false);

	useEffect(() => {
		const phdata = JSON.parse(window.localStorage.getItem("phData"));
		if (phdata) {
			setData(phdata);
		}
		const formdata = JSON.parse(window.localStorage.getItem("formData"));
		if (formdata) {
			setForm(formdata);
		}

		// const plantdate = JSON.parse(window.localStorage.getItem("plantDate"));
		// if (plantdate) {
		// 	setPlantingDate(plantdate);
		// }

		// const harvestDate = JSON.parse(window.localStorage.getItem("harvestDate"));
		// if (harvestDate) {
		// 	setHarvestDate(harvestDate);
		// }
	}, []);

	const getWeatherAPI = (date) => {
		const apiKey = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY;

		const location = form.city; // Replace with the location you want to get the temperature for
		const futureDate = date;
		const apiUrl = ` http://api.openweathermap.org/data/2.5/weather?q=${location}&dt=${futureDate}&appid=${apiKey}`;

		axios
			.get(apiUrl)
			.then((response) => {
				console.log(response);
				const temperature = response.data.main.temp;
				const celcius = temperature - 273;
				const Humididty = response.data.main.humidity;
				getModelSecondResults(celcius, Humididty, form.crop);
			})
			.catch((error) => {
				console.error("Error fetching temperature:", error.message);
				setLoader(false);
			});
	};

	const getModelSecondResults = async (temp, hum, label) => {
		console.log("second called ");
		try {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_BASE_URL}/get_second_results/`,
				{
					temperature: temp,
					humidity: hum,
					label: label,
				},
			);
			setLoader(false);
			window.localStorage.setItem("tempData", JSON.stringify(response.data));
			setSecondData(response.data);
			console.log(response);
		} catch (error) {
			setLoader(false);
			console.log(error);
		}
	};

	const handleDate = (date) => {
		setLoader(true);
		getWeatherAPI(date);
		const harvDate = formatDate(date);
		setHarvestDate(harvDate);
		const plantingDate = calculatePlantingDate(date, data.duration);
		const formatedPlantDate = formatDate(plantingDate);
		setPlantingDate(formatedPlantDate);
		window.localStorage.setItem("plantDate", JSON.stringify(formatedPlantDate));
		window.localStorage.setItem("harvestDate", JSON.stringify(harvDate));
	};

	return (
		<div className=' flex justify-center w-full bg-[#F6F5F8] h-full min-h-screen pt-[80px] md:pt-[128px] pb-[94px]'>
			<Header />
			<div className='md:w-[90%] xl:w-[70%] mx-auto '>
				<div className='flex space-x-2 bg-white md:bg-transparent py-[12px] px-[16px]'>
					<Link
						href='/dashboard'
						className='text-[#049600] text-[12px] md:text-[14px] tracking-[-0.2px] leading-[22px] leading-[26px] '
					>
						Dashboard
					</Link>{" "}
					<span>&gt;&gt;</span>{" "}
					<Link
						href='/dashboard/prediction'
						className='text-[#049600] text-[12px] md:text-[14px] tracking-[-0.2px] leading-[22px] leading-[26px] '
					>
						Add Prediction
					</Link>{" "}
					<span>&gt;&gt;</span>{" "}
					<h1 className='text-[#A4A4A4] text-[12px] md:text-[14px] tracking-[-0.2px] leading-[22px] leading-[26px] '>
						Prediction Result
					</h1>
				</div>

				<div className='flex justify-between items-center mt-[16px] mb-[26px] px-[16px] md:px-0 '>
					<h1 className='text-[#606060] md:text-[#141414] text-[14px] uppercase md:capitalize md:text-[30px] font-[500] tracking-[-0.5px] leading-[12px] md:leading-[38px] '>
						Prediction Result
					</h1>

					<div className='hidden md:block'>
						<Btn disabled={false} text='Track Prediction' />
					</div>
				</div>

				<div className='flex space-x-[24px] w-full'>
					<div className='w-full flex flex-col space-y-[16px]'>
						<div>
							<LabelledContainer
								header='Rice'
								rounded='rounded-t-[8px]'
								icon={cropResultIcon}
							>
								<div className='flex flex-col space-y-[16px]'>
									<CropItem
										name='pH level'
										value={data?.ph ? parseFloat(data?.ph.toFixed(2)) : "-"}
										max={parseFloat(data?.exp_ph.max).toFixed(2)}
										min={parseFloat(data?.exp_ph.min).toFixed(2)}
										status={data?.ph_rec.status}
										icon={dangerIcon}
									/>
									<CropItem
										name='Water availability'
										value={
											data?.water_availability
												? `${Math.round(data?.water_availability)}mm`
												: "-"
										}
										status={data?.water_availability_rec.status}
										icon={dangerIcon}
									/>
									{secondData?.temperature && (
										<>
											<CropItem
												name='Humidity'
												value={
													secondData?.humidity
														? parseFloat(secondData?.humidity.toFixed(2))
														: "-"
												}
												icon={dangerIcon}
												status={secondData?.humidity_rec.status}
											/>
											<CropItem
												name='Temperature'
												value={
													secondData?.temperature
														? parseFloat(secondData?.temperature.toFixed(2))
														: "-"
												}
												icon={dangerIcon}
												status={secondData?.temperature_rec.status}
											/>
										</>
									)}
								</div>
							</LabelledContainer>
							<div className='py-[16px] px-[24px] bg-[#F9F9F9] w-full text-[#5B5B5B] text-[14px] tracking-[-0.2px] leading-[22px] border border-[#E4E4E4] rounded-b-[8px] border-t-transparent '>
								If a danger icon is shown with the values, it means insufficient
								support for crop growth. Check the recommendation tabs for
								optimal ranges.
							</div>
							<div
								className='block md:hidden border border-[#049600] rounded-[8px] flex items-center justify-center py-[8px] px-[12px] cursor-pointer '
								onClick={() => {
									setShowRecMobile(true);
								}}
							>
								<h1 className='text-[#049600] text-[16px] neue400 leading-[28px] tracking-[-0.16px] '>
									View Recommendation
								</h1>
							</div>
						</div>
						<div>
							<LabelledContainer
								header='Prediction Period'
								rounded='rounded-t-[8px]'
								icon={cropPredictionIcon}
							>
								{secondData?.temperature && (
									<div className='bg-[#FCF1E9] p-[8px]  rounded-[4px] '>
										<h1 className='text-[#8B4513] text-[14px] tracking-[-0.2px] '>
											Plan your journey with us; Choose your preferred harvest
											date, and we will provide the ideal planting time. Note;
											Summer spans from June 20 to September 22, 2023.
										</h1>
									</div>
								)}

								<>
									<div className='flex flex-col space-y-[8px] mt-[24px]'>
										<h2 className='text-[#373737] text-[14px] leading-[22px] tracking-[-0.2px] '>
											Planting Period
										</h2>
										<div className='flex space-x-[24px]'>
											<PredictionPeriod
												label={plantingDate ? getSeason(plantingDate) : "-"}
											/>
											<PredictionPeriod
												label={plantingDate ? plantingDate : "MM/DD/YYYY"}
												icon={calenderIcon}
											/>
										</div>
									</div>

									<div className='flex flex-col space-y-[8px] mt-[24px]'>
										<h2 className='text-[#373737] text-[14px] leading-[22px] tracking-[-0.2px] '>
											Harvesting Period
										</h2>
										<div className='flex space-x-[24px]'>
											<PredictionPeriod label={data?.harvest_season} />
											<PredictionPeriod
												label={harvestDate ? harvestDate : "MM/DD/YYYY"}
												icon={calenderIcon}
											/>
										</div>
									</div>
								</>
							</LabelledContainer>
							{secondData?.temperature ? (
								<div className='py-[16px] px-[24px] bg-[#F9F9F9] w-full text-[#5B5B5B] text-[14px] tracking-[-0.2px] leading-[22px] border border-[#E4E4E4] rounded-b-[8px] border-t-transparent '>
									To preserve your predictions and maintain a record of them, be
									sure to <span className='text-[#049600]'>Save</span> the
									Prediction information.
								</div>
							) : (
								<div className='w-full md:inline-flex justify-end py-[16px] bg-white border border-[#E4E4E4] border-t-transparent px-[24px] rounded-b-[8px] '>
									<DatePickers
										season={data?.harvest_season}
										handleDate={handleDate}
									/>
								</div>
							)}
						</div>
					</div>
					<div className='w-full hidden md:block'>
						<LabelledContainer header='Recommendations'>
							<Recommendations header='pH Scale'>
								<div className='flex flex-col space-y-[8px]'>
									<h1 className='text-[#5B5B5B] neue500 text-[14px] leading-[22px] tracking-[-0.2px] '>The optimal pH range is within{" "}
									<span className='text-[#141414] neue500 text-[14px] leading-[22px] tracking-[-0.2px] '>
										{" "}
										{parseFloat(data?.exp_ph.min.toFixed(2))} -{" "}
										{parseFloat(data?.exp_ph.max.toFixed(2))}{" "}
									</span>{" "}
									and your pH value is {parseFloat(data?.ph.toFixed(2))}</h1>
									<div
										className='block  border border-[#049600] rounded-[8px] flex items-center justify-center py-[8px] px-[12px] cursor-pointer '
										onClick={() => {
											// setShowRecMobile(true);
										}}
									>
										<h1 className='text-[#049600] text-[16px] neue400 leading-[28px] tracking-[-0.16px] '>
											Get Recommendation
										</h1>
									</div>
								</div>
							</Recommendations>
						</LabelledContainer>
					</div>

					{showRecMobile && <RecMobile setShowRecMobile={setShowRecMobile} />}
					{/* <GradientProgressBar percentage={40} /> */}
				</div>
			</div>
			{loader && <Loader />}
		</div>
	);
};

export default Page;
