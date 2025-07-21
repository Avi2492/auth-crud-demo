/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// This is the official typing pattern for dynamic route handlers
type Params = {
	params: {
		id: string;
	};
};

export async function GET(_req: NextRequest, { params }: Params) {
	await connectDB();
	const user = await User.findById(params.id).select("-password");
	return NextResponse.json(user);
}

export async function PATCH(req: NextRequest, { params }: Params) {
	await connectDB();
	const body = await req.json();
	const { name, email, password, jobRole, city, phone } = body;

	const update: any = { name, email, jobRole, city, phone };
	if (password) update.password = await bcrypt.hash(password, 10);

	const updatedUser = await User.findByIdAndUpdate(params.id, update, {
		new: true,
	});
	return NextResponse.json(updatedUser);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
	await connectDB();
	await User.findByIdAndDelete(params.id);
	return NextResponse.json({ message: "Account deleted" });
}
