"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { TextField, Button, Box } from "@mui/material";
import { useState } from "react";

const schema = yup
	.object({
		name: yup.string().required(),
		email: yup.string().email().required(),
		password: yup.string().min(6).required(),
	})
	.required();

export default function RegisterPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(schema) });
	const [error, setError] = useState("");
	const router = useRouter();

	const onSubmit = async (data: any) => {
		const res = await fetch("/api/users/register", {
			method: "POST",
			body: JSON.stringify(data),
		});
		if (res.ok) {
			router.push("/auth/sign-in");
		} else {
			const err = await res.json();
			setError(err.message);
		}
	};

	return (
		<Box className="p-6 max-w-md mx-auto">
			<h1 className="text-xl font-bold mb-4">Register</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					label="Name"
					fullWidth
					{...register("name")}
					error={!!errors.name}
					helperText={errors.name?.message}
					sx={{ mb: 2 }}
				/>
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
					Register
				</Button>
			</form>
		</Box>
	);
}
