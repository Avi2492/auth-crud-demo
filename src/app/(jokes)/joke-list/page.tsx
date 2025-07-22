// app/(jokes)/joke-list/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getAllJokes } from "@/lib/actions/jokes.action";
import JokeCard from "@/app/components/JokeCard";

export const revalidate = 30; // ✅ ISR - rebuild every 30s

export default async function JokesPage() {
	const session = await getServerSession(authOptions);
	const jokes = await getAllJokes();

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
			{jokes.length > 0 ? (
				jokes.map((joke: any) => (
					<JokeCard
						key={joke._id}
						joke={joke}
						session={session}
					/>
				))
			) : (
				<p>No jokes found.</p>
			)}
		</div>
	);
}
