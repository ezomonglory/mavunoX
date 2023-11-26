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

export default function DatePickers({handleDate}) {
	const [selectedDate, setSelectedDate] = React.useState(null);
	const [isDatePickerOpen, setDatePickerOpen] = React.useState(false);

	const allowedMonths = {
		start: dayjs("2023-01-01"), // Replace with your start date
		end: dayjs("2023-03-31"), // Replace with your end date
	};

	const handleButtonClick = () => {
		setDatePickerOpen(true);
	};

	const handleDateChange = (newDate) => {
        setDatePickerOpen(false);
        const formattedDate = newDate.format('YYYY-MM-DD');
        console.log(formattedDate)
        handleDate(formattedDate)
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
					minDate={allowedMonths.start}
					maxDate={allowedMonths.end}
					renderInput={(params) => <TextField {...params} />}
				/>
			</div>

			<Btn text='Select Date' handleClick={handleButtonClick} />
		</LocalizationProvider>
	);
}
