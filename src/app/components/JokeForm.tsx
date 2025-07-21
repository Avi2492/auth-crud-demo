/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useSelector } from "react-redux";

const JokeForm = () => {
	const user = useSelector((state: any) => state.user.user);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setSuccess("");
		try {
			const res = await fetch("/api/jokes", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ title, content, user }),
			});
			if (!res.ok) throw new Error("Failed to submit joke");
			setTitle("");
			setContent("");
			setSuccess("Joke submitted successfully!");
		} catch (err: any) {
			setError(err.message);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-4 max-w-xl mx-auto p-4">
			<input
				type="text"
				placeholder="Joke Title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				className="w-full p-2 border rounded"
				required
			/>
			<textarea
				placeholder="Joke Content"
				value={content}
				onChange={(e) => setContent(e.target.value)}
				className="w-full p-2 border rounded"
				required
			/>
			{error && <p className="text-red-500">{error}</p>}
			{success && <p className="text-green-600">{success}</p>}
			<button
				type="submit"
				className="bg-blue-600 text-white px-4 py-2 rounded">
				Submit Joke
			</button>
		</form>
	);
};

export default JokeForm;
