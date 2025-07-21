import { Schema, model, models } from "mongoose";

const JokeSchema = new Schema(
	{
		title: { type: String, required: true },
		content: { type: String, required: true },
		user: {
			name: String,
			email: String,
		},
	},
	{ timestamps: true },
);

export default models.Joke || model("Joke", JokeSchema);
