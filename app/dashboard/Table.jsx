"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { delIcon, downArr, recIcon, verticalIcon, vrIcon } from "@/SVG";

const columns = [
	{ id: "name", label: "Crop Name " },
	{ id: "plantingTime", label: "Planting\u00a0Time " },
	{
		id: "harvestTime",
		label: "Harvesting\u00a0Time ",

		align: "right",
		format: (value) => value.toLocaleString("en-US"),
	},
	{
		id: "Status",
		label: "Status ",

		align: "right",
		format: (value) => value.toLocaleString("en-US"),
	},
	{
		id: "",
	},
];

function createData(name, plantingTime, harvestTime, Status) {
	return { name, plantingTime, harvestTime, Status };
}

const rows = [
	createData("India", "IN", 1324171354, "In Progress"),
	createData("China", "CN", 1403500365, "Completed"),
	createData("Italy", "IT", 60483973, "Upcoming"),
	createData("United States", "US", 327167434, "Upcoming"),
	createData("Canada", "CA", 37602103, "Completed"),
	createData("Australia", "AU", 25475400, "In Progress"),
	createData("Germany", "DE", 83019200, "Upcoming"),
	createData("Ireland", "IE", 4857000, "Upcoming"),
	createData("Mexico", "MX", 126577691, "In Progress"),
	createData("Japan", "JP", 126317000, "Upcoming"),
	createData("France", "FR", 67022000, "Completed"),
	createData("United Kingdom", "GB", 67545757, "Completed"),
	createData("Russia", "RU", 146793744, "In Progress"),
	createData("Nigeria", "NG", 200962417, "Completed"),
	createData("Brazil", "BR", 210147125, "Upcoming"),
];

export default function StickyHeadTable() {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<Paper
			sx={{
				width: "100%",
				minWidth: "700px",
				overflow: "hidden",
				border: "none",
			}}
			className='scroll-hidden'
		>
			<TableContainer className='scroll-hidden' sx={{ border: "none" }}>
				<Table stickyHeader aria-label='sticky table' sx={{ border: "none" }}>
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									sx={{
										backgroundColor: "#FCFCFD",
									}}
								>
									<div className='flex space-x-[4px] items-center'>
										<h1>{column.label}</h1>
										<span> {column.id === "" ? "" : downArr} </span>
									</div>
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row) => {
								return (
									<TableRow role='checkbox' tabIndex={-1} key={row.code}>
										{columns.map((column) => {
											const value = row[column.id];
											if (column.id === "name") {
												return (
													<TableCell key={column.id} align={column.align}>
														<h1 className='neue500 text-[14px] tracking-[-0.1px] leading-[20px] text-[#141414] '>
															{" "}
															{value}{" "}
														</h1>
													</TableCell>
												);
											} else if (column.id === "") {
												return (
													<TableCell key={column.id} align={column.align}>
														<div className='group relative'>
															<span
																className='cursor-pointer'
																onClick={() => {
																	console.log("hey");
																}}
															>
																{" "}
																{verticalIcon}{" "}
															</span>
															<div className=' group-hover:block hidden absolute right-0 top-0 bg-white z-30'>
																<div className='flex space-x-[12px] py-[12px] cursor-pointer hover:bg-gray-100 px-[16px]'>
																	<span>{vrIcon}</span>
																	<h2 className='text-[#141414] tracking-[-0.1px] leading-[22px] neue400 text-[14px]'>
																		View Result
																	</h2>
																</div>
																<div className='flex space-x-[12px] py-[12px] cursor-pointer hover:bg-gray-100 px-[16px]'>
																	<span>{recIcon}</span>
																	<h2 className='text-[#141414] tracking-[-0.1px] leading-[22px] neue400 text-[14px]'>
																		Recommendation
																	</h2>
																</div>
																<div className='flex space-x-[12px] py-[12px] cursor-pointer hover:bg-gray-100 px-[16px]'>
																	<span>{delIcon}</span>
																	<h2 className='text-[#141414] tracking-[-0.1px] leading-[22px] neue400 text-[14px]'>
																		Delete
																	</h2>
																</div>
															</div>
														</div>
													</TableCell>
												);
											} else if (value === "In Progress") {
												return (
													<TableCell key={column.id} align={"left"}>
														<div className='bg-[#03784713] py-[2px] px-[8px] rounded-full w-fit inline-flex items-center justify-center  '>
															<h1 className='text-[12px] tracking-[-0.1px] neue400 leading-[18px] text-[#037847] '>
																{" "}
																{column.format && typeof value === "number"
																	? column.format(value)
																	: value}
															</h1>
														</div>
													</TableCell>
												);
											} else if (value === "Completed") {
												return (
													<TableCell key={column.id} align={"left"}>
														<div className='bg-[#36425417] py-[2px] px-[8px] rounded-full w-fit inline-flex items-center justify-center  '>
															<h1 className='text-[12px] tracking-[-0.1px] neue400 leading-[18px] text-[#364254] '>
																{" "}
																{column.format && typeof value === "number"
																	? column.format(value)
																	: value}
															</h1>
														</div>
													</TableCell>
												);
											} else if (value === "Upcoming") {
												return (
													<TableCell key={column.id} align={"left"}>
														<div className='bg-[#ad7c011e] py-[2px] px-[8px] rounded-full w-fit inline-flex items-center justify-center  '>
															<h1 className='text-[12px] tracking-[-0.1px] neue400 leading-[18px] text-[#AD7D01] '>
																{" "}
																{column.format && typeof value === "number"
																	? column.format(value)
																	: value}
															</h1>
														</div>
													</TableCell>
												);
											} else {
												return (
													<TableCell key={column.id} align={"left"}>
														<h1 className='text-[14px] tracking-[-0.1px] neue400 leading-[20px] '>
															{" "}
															{column.format && typeof value === "number"
																? column.format(value)
																: value}
														</h1>
													</TableCell>
												);
											}
										})}
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
			{/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
    /> */}
		</Paper>
	);
}
