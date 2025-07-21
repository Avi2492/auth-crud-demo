"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/userSlice";

export default function Dashboard() {
	const { data: session } = useSession();
	const [user, setUser] = useState<any>(null);
	const [editing, setEditing] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		jobRole: "",
		city: "",
		phone: "",
	});

	const dispatch = useDispatch();

	useEffect(() => {
		if (session?.user) {
			dispatch(setUser(session.user));
		}
	}, [session, dispatch]);

	useEffect(() => {
		const fetchUser = async () => {
			const res = await fetch(`/api/users/${session?.user?._id}`);
			const data = await res.json();
			setUser(data);
			setFormData({
				name: data.name || "",
				email: data.email || "",
				password: "",
				jobRole: data.jobRole || "",
				city: data.city || "",
				phone: data.phone || "",
			});
		};
		if (session?.user?._id) fetchUser();
	}, [session]);

	const handleChange = (e: any) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSave = async () => {
		const res = await fetch(`/api/users/${user._id}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData),
		});
		if (res.ok) {
			setEditing(false);
		}
	};

	const handleDelete = async () => {
		const confirmed = confirm("Are you sure you want to delete your account?");
		if (!confirmed) return;

		const res = await fetch(`/api/users/${user._id}`, { method: "DELETE" });
		if (res.ok) {
			await signOut({ callbackUrl: "/auth/sign-in" });
		}
	};

	return (
		<Box className="p-6 max-w-lg mx-auto">
			<h1 className="text-2xl font-bold mb-4">User Dashboard</h1>

			{["name", "email", "password", "jobRole", "city", "phone"].map(
				(field) => (
					<TextField
						key={field}
						label={field[0].toUpperCase() + field.slice(1)}
						name={field}
						value={formData[field as keyof typeof formData]}
						type={field === "password" ? "password" : "text"}
						onChange={handleChange}
						fullWidth
						className="mb-4"
						disabled={!editing}
					/>
				),
			)}

			<Box className="flex gap-4">
				<Button
					onClick={() => {
						if (editing) handleSave();
						else setEditing(true);
					}}
					variant="contained"
					color="primary">
					{editing ? "Save Details" : "Edit Profile"}
				</Button>

				<Button
					onClick={handleDelete}
					variant="outlined"
					color="error">
					Delete Account
				</Button>
			</Box>
		</Box>
	);
}
