import React from "react";

const LabelSelect = ({
	label,
	options,
	icon,
	name,
	handleChange,
	selectedValue,
}) => {
	return (
		<div className='flex flex-col space-y-[8px]'>
			<h1 className='text-[#808080] text-[14px] neue400 leading-[22px] tracking-[-0.1px]'>
				{label}
			</h1>
			<div className='py-[8px] px-[16px] h-[48px] bg-white border border-[#E4E4E4] flex justify-between rounded-[8px] '>
				<select
					onChange={(e) => handleChange(e)}
					value={selectedValue}
					className='w-full outline-none border-none neue500 cursor-pointer '
					name={name}
				>
					{options?.map((data, i) => (
						<option key={i} value={data.value}>
							{" "}
							{data.name}{" "}
						</option>
					))}
				</select>
				<span>{icon}</span>
			</div>
		</div>
	);
};

export default LabelSelect;
