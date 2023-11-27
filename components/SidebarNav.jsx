"use client";
import {
	getChatIcon,
	getDashIcon,
	helpIcon,
	profileIcon,
	settingIcon,
} from "@/SVG";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const SidebarNav = ({ text, href }) => {
	const [color, setColor] = useState(false);
	const [icon, setIcon] = useState();
    let cols;

	useEffect(() => {
		console.log(window.location.pathname === href);
		if (window.location.pathname === href) {
			setColor(true)
            cols = "#049600"
		} else {
			setColor(false);
            cols = "#A4A4A4"
		}

		if (text === "Chatbot") {
			const ic = getChatIcon(cols);
			setIcon(ic);
		}
		if (text === "My Profile") {
			const ic = profileIcon(cols);
			setIcon(ic);
		}
		if (text === "Settings") {
			const ic = settingIcon(cols);
			setIcon(ic);
		}
		if (text === "Help and Support") {
			const ic = helpIcon(cols);
			setIcon(ic);
		}

		if (text === "Dashboard") {
			const ic = getDashIcon(cols);
			setIcon(ic);
		}
        console.log(cols)
	}, []);

	return (
		<Link className='flex space-x-[16px] items-center ' href={href}>
			<span>{icon}</span>
			<h2
				className={`text-[16px] neue400 tracking-[-0.1px] leading-[24px] ${color ? "text-[#049600]" : "text-[#5B5B5B]" } `}
			>
				{" "}
				{text}{" "}
			</h2>
		</Link>
	);
};

export default SidebarNav;
