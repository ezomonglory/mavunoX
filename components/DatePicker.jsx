"use client";
import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { TextField } from "@mui/material";
import Btn from "./Btn";

export default function DatePickers({ handleDate, season }) {
	const [selectedDate, setSelectedDate] = React.useState(null);
	const [isDatePickerOpen, setDatePickerOpen] = React.useState(false);
    const [allowedMonths, setAllowedMonths] = React.useState()
	const now = dayjs();
	let start, end;    

	const getSeasonDates = (season) => {
		if (season === "winter" || season === "Winter") {
			start = dayjs(now.year() + "-12-01"); // Winter starts on December 1st
			end = dayjs(now.year() + "-02-28"); // Winter ends on February 28th (or 29th for a leap year)
		} else if (season === "spring" || season === "Spring") {
			start = dayjs(now.year() + "-03-01"); // Spring starts on March 1st
			end = dayjs(now.year() + "-05-31"); // Spring ends on May 31st
		} else if (season === "summer" || season === "Summer") {
			start = dayjs(now.year() + "-06-01"); // Summer starts on June 1st
			end = dayjs(now.year() + "-08-31"); // Summer ends on August 31st
		} else if (season === "rain" || season === "Rain") {
			start = dayjs(now.year() + "-09-01"); // Fall starts on September 1st
			end = dayjs(now.year() + "-11-30"); // Fall ends on November 30th
		} else {
			// Default to a full year if the season is not recognized
			start = dayjs(now.year() + "-01-01");
			end = dayjs(now.year() + "-12-31");
		}

		return { start, end };
	};


    React.useEffect(()=>{
        const {start, end} = getSeasonDates(season)
        setAllowedMonths({start, end})
    },[])
    

	const handleButtonClick = () => {
		setDatePickerOpen(true);
	};

	const handleDateChange = (newDate) => {
		setDatePickerOpen(false);
		const formattedDate = newDate.format("YYYY-MM-DD");
		console.log(formattedDate);
		handleDate(formattedDate);
		setSelectedDate(formattedDate);
	};

	const handleDatePickerClose = () => {
		setDatePickerOpen(false);
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<div className='hidden'>
				<MobileDatePicker
					onAccept={handleDateChange}
					onClose={handleDatePickerClose}
					label='Select Harvest Date'
					open={isDatePickerOpen}
					value={selectedDate}
					minDate={allowedMonths?.start}
					maxDate={allowedMonths?.end}
					renderInput={(params) => <TextField {...params} />}
					sx={{
						".MuiPickersDay-daySelected": {
							backgroundColor: "#049600",
							color: "white",
						},
					}}
				/>
			</div>

			<Btn text='Select Date' handleClick={handleButtonClick} />
		</LocalizationProvider>
	);
}
