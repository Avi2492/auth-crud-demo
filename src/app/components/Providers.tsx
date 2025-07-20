"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { SessionProvider } from "next-auth/react";

export function AppProvider({ children }: { children: React.ReactNode }) {
	return (
		<SessionProvider>
			<Provider store={store}>{children}</Provider>;
		</SessionProvider>
	);
}


// $2b$10$1XQGutg8xM4qUXlwg0S.HuAAcRIjAYgUYNMoP9iERl24glKFKRQ8C
