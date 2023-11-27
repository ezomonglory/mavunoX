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
import RecModal from "./RecModal";
import dayjs from "dayjs";

const Page = () => {
	const [data, setData] = useState();
	const [secondData, setSecondData] = useState();
	const [loader, setLoader] = useState(false);
	const [form, setForm] = useState();
	const [plantingDate, setPlantingDate] = useState();
	const [harvestDate, setHarvestDate] = useState();
	const [showRecMobile, setShowRecMobile] = useState(false);
	const [showRecModal, setShowRecModal] = useState(false);
	const now = dayjs();
	let start, end;

	// const getHarvestDateRange = (season, durationDays) => {
	// 	const now = dayjs();
	// 	let start, end;

	// 	// Get the start date for the specified season in the current year
	// 	if (season === "winter") {
	// 		start = dayjs(now.year(), "12-01"); // Winter starts on December 1st
	// 	} else if (season === "spring") {
	// 		start = dayjs(now.year(), "03-01"); // Spring starts on March 1st
	// 	} else if (season === "summer") {
	// 		start = dayjs(now.year(), "06-01"); // Summer starts on June 1st
	// 	} else if (season === "fall") {
	// 		start = dayjs(now.year(), "09-01"); // Fall starts on September 1st
	// 	} else {
	// 		throw new Error("Invalid season");
	// 	}

	// 	// If the current month is after the last month of the season, adjust to the next year
	// 	if (now.isAfter(dayjs(start).endOf("month"))) {
	// 		start = start.add(1, "year");
	// 	}

	// 	// Calculate the end date based on the start date and crop duration
	// 	end = dayjs(start).endOf("month");

	// 	// Check if the current month is within the season
	// 	if (now.isBefore(dayjs(start).endOf("month"))) {
	// 		// Calculate the minimum harvest date (current day + duration)
	// 		const minHarvestDate = now.add(durationDays, "day");

	// 		// Check if the minimum harvest date is after the end of the season
	// 		if (minHarvestDate.isAfter(end)) {
	// 			// Return the range for the next occurrence of the season
	// 			console.log(
	// 				"Harvest date range:",
	// 				start.format("YYYY-MM-DD"),
	// 				"to",
	// 				end.format("YYYY-MM-DD"),
	// 			);
	// 			return getHarvestDateRange(season, durationDays).start.add(1, "year");
	// 		}

	// 		// Return the range from the current day to the end of the month
	// 		console.log(
	// 			"Harvest date range:",
	// 			start.format("YYYY-MM-DD"),
	// 			"to",
	// 			end.format("YYYY-MM-DD"),
	// 		);
	// 		return { start: now, end: end };
	// 	} else {
	// 		// Return the range for the next occurrence of the season
	// 		console.log(
	// 			"Harvest date range:",
	// 			start.format("YYYY-MM-DD"),
	// 			"to",
	// 			end.format("YYYY-MM-DD"),
	// 		);
	// 		return getHarvestDateRange(season, durationDays).start.add(1, "year");
	// 	}
	// };

	function calculateHarvestDate(season, duration) {
		const currentDate = new Date();
		let harvestYear = currentDate.getFullYear();

		// Check if the current date has passed the harvest season in the current year
		const seasonMonths = {
			spring: [2, 3, 4],
			summer: [5, 6, 7],
			rainy: [8, 9, 10],
			winter: [11, 0, 1], // Months are zero-based in JavaScript Date object
		};

		const currentMonth = currentDate.getMonth();
		if (currentMonth > seasonMonths[season][seasonMonths[season].length - 1]) {
			// If the current month is beyond the specified season, move to the next year
			harvestYear++;
		}

		// Calculate the minimum harvest date
		let minHarvestDate = new Date(currentDate);
		minHarvestDate.setDate(currentDate.getDate() + duration);

		// Check if the current date is within the allowed months for the season
		if (!seasonMonths[season].includes(currentMonth)) {
			// If not, set the date range to the first and last day of the specified season
			minHarvestDate = new Date(harvestYear, seasonMonths[season][0], 1);
			const lastMonthDay =
				seasonMonths[season][seasonMonths[season].length - 1];
			const maxHarvestDate = new Date(harvestYear, lastMonthDay + 1, 0);
			return {
				minHarvestDate: minHarvestDate.toISOString().slice(0, 10),
				maxHarvestDate: maxHarvestDate.toISOString().slice(0, 10),
			};
		}

		// Check if the minimum harvest date is within the allowed months for the season
		const allowedMonths = seasonMonths[season];
		while (!allowedMonths.includes(minHarvestDate.getMonth())) {
			minHarvestDate.setFullYear(harvestYear);
		}

		// Set the max harvest date to the last day of the specified season
		const lastMonthDay = seasonMonths[season][seasonMonths[season].length - 1];
		const maxHarvestDate = new Date(harvestYear, lastMonthDay + 1, 0);

		return {
			minHarvestDate: new Date(Math.max(currentDate, minHarvestDate))
				.toISOString()
				.slice(0, 10),
			maxHarvestDate: maxHarvestDate.toISOString().slice(0, 10),
		};
	}

	const getHarvestDate = (season, duration) => {
		const currentDate = new Date();
		let harvestYear = currentDate.getFullYear();
        let dateObj = {
            start:'',
            end:''
        }

		console.log("hey");
		const seasonMonths = {
			spring: [2, 3, 4],
			summer: [5, 6, 7],
			rainy: [8, 9, 10],
			winter: [11, 12, 13],
		};

		let month;
		const currentMonth = currentDate.getMonth();
		if (currentMonth === 0) {
			month = 12;
		} else if (currentMonth === 1) {
			month = 13;
		} else {
			month = currentMonth;
		}
		console.log(month + "month");
		console.log(seasonMonths[season][seasonMonths[season].length - 1]);
		// This function is returning if its in season it returns this year if the seaon has passed it return next year
		if (month > seasonMonths[season][seasonMonths[season].length - 1]) {
			// If the current month is beyond the specified season, move to the next year
			const next = harvestYear + 1;
			console.log(next);
			console.log(seasonMonths[season]);
			console.log(seasonMonths[season][0]);
			console.log(seasonMonths[season][2]);
            if (season === "spring") {
                console.log("start", ":", `${next}-02-01`);
                console.log("end", ":", `${next}-04-31`);
                dateObj.start = `${next}-02-01`
                dateObj.end = `${next}-04-31`
                return dateObj
            }
            if (season === "summer") {
                console.log("start", ":", `${next}-05-01`);
                console.log("end", ":", `${next}-07-31`);
            }
            if (season === "rainy") {
                console.log("start", ":", `${next}-08-01`);
                console.log("end", ":", `${next}-10-30`);
            }
            if (season === "winter") {
                console.log("start", ":", `${next}-11-01`);
                console.log("end", ":", `${next + 1}-0-31`);
            }

			// return
		} else {
			// if current month is within the season or it hasnt reach its season yet it comes here
			console.log(seasonMonths[season]);
			const newda = new Date(currentDate);
			// duration is entering here
			newda.setDate(currentDate.getDate() + duration);
			const durationDate = new Date(newda);            
			const durationyear = durationDate.getFullYear();
            console.log(durationyear)
			const durationmonth = durationDate.getMonth();
			console.log(durationDate.getMonth(), durationyear);
			getSeason(durationmonth);

			function getSeason(monthNumber) {
				// Ensure the monthNumber is within a valid range (0 to 11)
				let newmonth;
				if (monthNumber === 0) {
					newmonth = 12;
				} else if (monthNumber === 1) {
					newmonth = 13;
				} else {
					newmonth = monthNumber;
				}

				console.log(newmonth);

				// Iterate through seasons and check if the monthNumber is in any of them
				for (const [seasons, months] of Object.entries(seasonMonths)) {
					if (months.includes(newmonth)) {
						console.log(seasons);
						console.log(seasonMonths[seasons]);
						console.log(seasonMonths[seasons][0]);
						console.log(seasonMonths[seasons][2]);
                        let lastday;
						// if (season === seasons) {
						// 	console.log(seasonMonths[seasons][2]);
						// 	// start date
						// 	console.log(newda.toISOString().slice(0, 10));
						// 	// end date
						// 	console.log(seasonMonths[seasons][2]);

						// 	if (seasonMonths[seasons][2] === 12) {
						// 		lastday = getLastDayOfMonth(newda.getFullYear(), 0);
						// 	} else if (seasonMonths[seasons][2] === 13) {
						// 		lastday = getLastDayOfMonth(newda.getFullYear(), 1);
						// 	} else {
						// 		console.log("hhu");
						// 		console.log(seasonMonths[seasons][2]);
								
                        //         lastday = getLastDayOfMonth(
						// 			newda.getFullYear(),
						// 			seasonMonths[seasons][2]
						// 		);
						// 	}

						// 	function getLastDayOfMonth(year, month) {
						// 		console.log(month);
						// 		// Ensure the month is within a valid range (0 to 11)
						// 		if (month < 0 || month > 11) {
						// 			throw new Error("Invalid month");
						// 		}

						// 		// Create a Date object for the first day of the next month
						// 		const firstDayOfNextMonth = new Date(year, month + 1, 1);

						// 		// Subtract one day to get the last day of the specified month
						// 		const lastDayOfMonth = new Date(firstDayOfNextMonth);
						// 		lastDayOfMonth.setDate(lastDayOfMonth.getDate() - 1);

						// 		console.log(lastDayOfMonth);
						// 		return lastDayOfMonth;
						// 	}

                        //     console.log("start", ":", newda.toISOString().slice(0, 10));
                        //     console.log("end", ":", lastday.Fform);
						// 	return;
						// }
						if (seasons === "spring") {
							console.log("start", ":", `${durationyear}-02-01`);
							console.log("end", ":", `${durationyear}-04-31`);
						}
						if (seasons === "summer") {
							console.log("start", ":", `${durationyear}-05-01`);
							console.log("end", ":", `${durationyear}-07-31`);
						}
						if (seasons === "rainy") {
							console.log("start", ":", `${durationyear}-08-01`);
							console.log("end", ":", `${durationyear}-10-30`);
						}
						if (seasons === "winter") {
							console.log("start", ":", `${durationyear}-11-01`);
							console.log("end", ":", `${durationyear + 1}-1-31`);
						}
					}
				}
			}
			// if(durationDate.getMonth() > month ){
			//     console.log("hheusd")
			// }
		}
	};

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
			alert(error);
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
				{/* <Btn
					text='cli'
					handleClick={() => {
						console.log("Calll");
						getHarvestDate("summer", 75);
						// const harvestDateRange = getHarvestDate("rainy", 10);
						// console.log(harvestDateRange);
					}}
				/> */}

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
								header={form?.crop}
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
								{!secondData?.temperature && (
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
									<h1 className='text-[#5B5B5B] neue500 text-[14px] leading-[22px] tracking-[-0.2px] '>
										The optimal pH range is within{" "}
										<span className='text-[#141414] neue500 text-[14px] leading-[22px] tracking-[-0.2px] '>
											{" "}
											{parseFloat(data?.exp_ph.min.toFixed(2))} -{" "}
											{parseFloat(data?.exp_ph.max.toFixed(2))}{" "}
										</span>{" "}
										and your pH value is{" "}
										<span className='text-[#141414] neue500 text-[14px] leading-[22px] tracking-[-0.2px] '>
											{parseFloat(data?.ph.toFixed(2))}
										</span>
									</h1>
									<div
										className='block  border border-[#049600] rounded-[8px] flex items-center justify-center py-[8px] px-[12px] cursor-pointer '
										onClick={() => {
											setShowRecModal(true);
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
			{showRecModal && <RecModal setShowRecModal={setShowRecModal} />}
			{loader && <Loader />}
		</div>
	);
};

export default Page;
