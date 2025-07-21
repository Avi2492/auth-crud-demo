"use client";

import { useState } from "react";

interface JokeProps {
	title: string;
	content: string;
	user?: { name?: string; email?: string }; // make user optional
}

const JokeCard = ({ title, content, user }: JokeProps) => {
	const [showFull, setShowFull] = useState(false);
	const preview =
		content.length > 100 ? content.slice(0, 100) + "..." : content;

	return (
		<div className="p-4 border rounded shadow-md bg-white space-y-2">
			<h2 className="text-lg font-semibold">{title}</h2>
			<p>
				{showFull ? content : preview}
				{content.length > 100 && (
					<button
						className="ml-2 text-blue-600 underline text-sm"
						onClick={() => setShowFull(!showFull)}>
						{showFull ? "Show Less" : "Read More"}
					</button>
				)}
			</p>
			<p className="text-sm text-gray-500">
				Submitted by: {user?.name || user?.email || "Anonymous"}
			</p>
		</div>
	);
};

export default JokeCard;
