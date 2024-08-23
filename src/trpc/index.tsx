import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from '../../../mamba-project/src/trpc/trpc.router'

export const trpc = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: "http://localhost:3000/trpc", // you should update this to use env variables
        }),
    ],
});