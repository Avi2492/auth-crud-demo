// app/jokes/page.tsx

import JokeCard from "@/app/components/JokeCard";
import { getAllJokes } from "@/lib/actions/jokes.action";

export const revalidate = 30; // ISR - rebuilds every 30s

export default async function JokesPage() {
	const jokes = await getAllJokes();

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
			{Array.isArray(jokes) && jokes.length > 0 ? (
				jokes.map((joke) => (
					<JokeCard
						key={joke._id}
						title={joke.title}
						content={joke.content}
						user={joke.user}
					/>
				))
			) : (
				<p className="text-gray-500 col-span-full">No jokes found.</p>
			)}
		</div>
	);
}
