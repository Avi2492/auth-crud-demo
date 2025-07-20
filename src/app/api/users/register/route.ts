import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { name, email, password } = body;

		await connectDB();
		const existingUser = await User.findOne({ email });
		if (existingUser)
			return NextResponse.json(
				{ message: "User already exists" },
				{ status: 400 },
			);

		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await User.create({ name, email, password: hashedPassword });

		return NextResponse.json({ message: "User created", user });
	} catch (error: any) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
