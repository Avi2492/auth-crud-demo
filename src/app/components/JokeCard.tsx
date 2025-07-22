"use client";

import React from "react";

type Props = {
	joke: any;
	session: any;
	onDelete?: () => void;
};

export default function JokeCard({ joke, session, onDelete }: Props) {
	const handleDelete = async () => {
		try {
			const res = await fetch(`/api/jokes/${joke._id}`, {
				method: "DELETE",
			});
			if (res.ok) {
				alert("Joke deleted");
				onDelete?.();
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="p-4 shadow rounded-lg bg-white space-y-2">
			<h2 className="font-bold text-lg">{joke.title}</h2>
			<p>{joke.content}</p>
			<p className="text-sm text-gray-500">By: {joke.creatorName}</p>

			{session?.user?._id === joke.creatorId && (
				<button
					className="text-red-500 text-sm"
					onClick={handleDelete}>
					Delete
				</button>
			)}
		</div>
	);
}
