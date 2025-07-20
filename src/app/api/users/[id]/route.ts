import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(
	req: Request,
	{ params }: { params: { id: string } },
) {
	await connectDB();
	const user = await User.findById(params.id).select("-password");
	return NextResponse.json(user);
}

export async function PATCH(
	req: Request,
	{ params }: { params: { id: string } },
) {
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

export async function DELETE(
	req: Request,
	{ params }: { params: { id: string } },
) {
	await connectDB();
	await User.findByIdAndDelete(params.id);
	return NextResponse.json({ message: "Account deleted" });
}
