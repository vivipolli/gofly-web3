"use client"; 

import { config } from "@/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { State, WagmiProvider } from "wagmi";

export default function ServerProvider({
	children,
	initialState
}: {
	children: ReactNode;
	initialState?: State
}) {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<WagmiProvider config={config} initialState={initialState}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</WagmiProvider>
	);
}
