// app/api/jokes/[id]/route.ts
import { connectDB } from "@/lib/db";
import Joke from "@/models/Joke";
import { NextRequest, NextResponse } from "next/server";

// export async function DELETE(req: NextRequest, { params }: { params: any }) {
// 	try {
// 		await connectDB();
// 		const deleted = await Joke.findByIdAndDelete(params.id);
// 		if (!deleted)
// 			return NextResponse.json({ message: "Joke not found" }, { status: 404 });
// 		return NextResponse.json({ message: "Joke deleted" }, { status: 200 });
// 	} catch (error) {
// 		return NextResponse.json(
// 			{ message: "Failed to delete joke", error },
// 			{ status: 500 },
// 		);
// 	}
// }

export async function DELETE(
	req: NextRequest,
	{ params }: { params: { id: string } },
) {
	try {
		await connectDB();

		const deletedJoke = await Joke.findByIdAndDelete(params.id);
		if (!deletedJoke) {
			return NextResponse.json({ message: "Joke not found" }, { status: 404 });
		}

		return NextResponse.json(
			{ message: "Joke deleted successfully" },
			{ status: 200 },
		);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ message: "Server Error", error },
			{ status: 500 },
		);
	}
}
