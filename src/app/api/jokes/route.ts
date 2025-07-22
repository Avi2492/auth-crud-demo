import { connectDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Joke from "@/models/Joke";
import { getServerSession } from "next-auth";

// export async function POST(req: NextRequest) {
// 	await connectDB();
// 	const body = await req.json();
// 	const { title, content, user } = body;

// 	try {
// 		const newJoke = await Joke.create({ title, content, user });
// 		return NextResponse.json(newJoke, { status: 201 });
// 	} catch (err) {
// 		return NextResponse.json(
// 			{ message: "Failed to create joke", err },
// 			{ status: 500 },
// 		);
// 	}
// }

export async function POST(req: Request) {
	try {
		await connectDB();
		const session = await getServerSession(authOptions);
		const body = await req.json();
		const { title, content } = body;

		const user = session?.user;
		if (!user) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const joke = await Joke.create({
			title,
			content,
			user: { name: user.name, email: user.email },
		});

		return NextResponse.json(joke, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{ message: "Failed to create joke", error },
			{ status: 500 },
		);
	}
}

export async function GET() {
	try {
		await connectDB();
		const jokes = await Joke.find().sort({ createdAt: -1 });
		return NextResponse.json(jokes);
	} catch (error) {
		return NextResponse.json(
			{ message: "Failed to fetch jokes", error },
			{ status: 500 },
		);
	}
}
