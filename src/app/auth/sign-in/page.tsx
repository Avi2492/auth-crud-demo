"use client";

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";

const schema = yup.object({
	email: yup.string().email().required(),
	password: yup.string().required(),
});

export default function LoginPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(schema) });
	const router = useRouter();
	const [error, setError] = useState("");

	const onSubmit = async (data: any) => {
		const res = await signIn("credentials", {
			redirect: false,
			email: data.email,
			password: data.password,
		});
		if (res?.error) {
			setError("Invalid email or password");
		} else {
			router.push("/dashboard");
		}
	};

	return (
		<Box className="p-6 max-w-md mx-auto">
			<h1 className="text-xl font-bold mb-4">Login</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					label="Email"
					fullWidth
					{...register("email")}
					error={!!errors.email}
					helperText={errors.email?.message}
					sx={{ mb: 2 }}
				/>
				<TextField
					label="Password"
					type="password"
					fullWidth
					{...register("password")}
					error={!!errors.password}
					helperText={errors.password?.message}
					sx={{ mb: 2 }}
				/>
				{error && <p className="text-red-500 mb-2">{error}</p>}
				<Button
					type="submit"
					variant="contained"
					fullWidth>
					Login
				</Button>
			</form>
		</Box>
	);
}
