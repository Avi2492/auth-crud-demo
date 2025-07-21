// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
	const pathname = usePathname();

	const navItems = [
		{ label: "Home", href: "/" },
		{ label: "About", href: "/about" },
		{ label: "Create Joke", href: "/create-joke" },
		{ label: "Jokes", href: "/joke-list" },
	];

	return (
		<nav className="flex justify-between items-center p-4 shadow-md">
			<Link
				href="/"
				className="text-xl font-bold text-blue-600">
				Jokebites
			</Link>
			<ul className="flex gap-6 items-center">
				{navItems.map((item) => (
					<li key={item.href}>
						<Link
							href={item.href}
							className={
								pathname === item.href ? "font-bold text-blue-500" : ""
							}>
							{item.label}
						</Link>
					</li>
				))}
				<li>
					<Link
						href="/auth/sign-in"
						className="bg-blue-600 text-white px-4 py-2 rounded-xl">
						Get Started
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
