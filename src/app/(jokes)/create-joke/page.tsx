// app/create-joke/page.tsx

import JokeForm from "@/app/components/JokeForm";

export const dynamic = "force-dynamic"; // SSR

export default async function CreateJokePage() {
	return (
		<div className="max-w-xl mx-auto p-6">
			<h2 className="text-2xl font-semibold mb-4">Create a Joke</h2>
			<JokeForm />
		</div>
	);
}
