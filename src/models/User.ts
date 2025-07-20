import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
	{
		name: String,
		email: { type: String, unique: true },
		password: String,
		jobRole: String,
		city: String,
		phone: String,
	},
	{ timestamps: true },
);

export const User = models.User || mongoose.model("User", UserSchema);
