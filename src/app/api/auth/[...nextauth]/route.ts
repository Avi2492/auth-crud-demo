// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { User } from "@/models/User";
// import bcrypt from "bcryptjs";
// import { connectDB } from "@/lib/db";

// const handler = NextAuth({
// 	providers: [
// 		CredentialsProvider({
// 			name: "Credentials",
// 			credentials: {
// 				email: {},
// 				password: {},
// 			},
// 			async authorize(credentials: any) {
// 				await connectDB();
// 				const user = await User.findOne({ email: credentials.email });
// 				if (!user) throw new Error("No user found");
// 				const isPasswordCorrect = await bcrypt.compare(
// 					credentials.password,
// 					user.password,
// 				);
// 				if (!isPasswordCorrect) throw new Error("Invalid password");
// 				return user;
// 			},
// 		}),
// 	],
// 	callbacks: {
// 		async session({ session, token }) {
// 			if (token) session?.user._id = token.sub;
// 			return session;
// 		},
// 	},
// 	secret: process.env.NEXTAUTH_SECRET!,
// 	session: { strategy: "jwt" },
// 	pages: {
// 		signIn: "/auth/sign-in",
// 	},
// });

// export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

// const handler = NextAuth({
// 	providers: [
// 		CredentialsProvider({
// 			name: "Credentials",
// 			credentials: {
// 				email: {},
// 				password: {},
// 			},
// 			async authorize(credentials) {
// 				await connectDB();

// 				if (!credentials?.email || !credentials?.password) {
// 					throw new Error("Missing email or password");
// 				}

// 				const user = await User.findOne({ email: credentials?.email });
// 				if (!user) throw new Error("No user found");
// 				const isPasswordCorrect = await bcrypt.compare(
// 					credentials.password,
// 					user.password,
// 				);
// 				if (!isPasswordCorrect) throw new Error("Invalid password");
// 				return {
// 					id: user._id.toString(),
// 					name: user.name,
// 					email: user.email,
// 				};
// 			},
// 		}),
// 	],
// 	callbacks: {
// 		async jwt({ token, user }) {
// 			if (user) {
// 				token.id = user.id;
// 			}
// 			return token;
// 		},
// 		async session({ session, token, user }) {
// 			session.user._id = token.id as string;
// 			return session;
// 		},
// 	},
// 	secret: process.env.NEXTAUTH_SECRET,
// 	session: { strategy: "jwt" },
// 	pages: {
// 		signIn: "/auth/sign-in",
// 	},
// });

// export { handler as GET, handler as POST };

// src/app/api/auth/[...nextauth]/route.ts

export const authOptions: any = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {},
				password: {},
			},
			async authorize(credentials) {
				await connectDB();

				if (!credentials?.email || !credentials?.password) {
					throw new Error("Missing email or password");
				}

				const user = await User.findOne({ email: credentials?.email });
				if (!user) throw new Error("No user found");

				const isPasswordCorrect = await bcrypt.compare(
					credentials.password,
					user.password,
				);
				if (!isPasswordCorrect) throw new Error("Invalid password");

				return {
					id: user._id.toString(),
					name: user.name,
					email: user.email,
				};
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }: { token: any; user: any }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		async session({ session, token }: { session: any; token: any }) {
			session.user._id = token.id as string;
			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
	session: { strategy: "jwt" },
	pages: {
		signIn: "/auth/sign-in",
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
