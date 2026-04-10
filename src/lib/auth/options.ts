import type {NextAuthOptions} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;

type LoginResponse = {
    token: string;
    user: {
        userId: number;
        userName: string;
        role: string;
    };
};

async function loginOnBackend(credentials: { userName: string; password: string }) {
    // AGREGA ESTO PARA DEBUGUEAR:
    console.log(">>> LLAMANDO AL BACKEND EN:", `${API_BASE}/auth/login`);
    console.log(">>> BODY ENVIADO:", JSON.stringify(credentials));


    const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(credentials),
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || "Credenciales inválidas");
    }

    return (await res.json()) as LoginResponse;

    
}


export const authOptions: NextAuthOptions = {
    session: {strategy: "jwt"},
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        Credentials({
            name: "Credentials",
            credentials: {
                userName: {label: "Usuario", type: "text"},
                password: {label: "Contraseña", type: "password"},
            },
            authorize: async (credentials) => {
                if (!credentials?.userName || !credentials?.password) return null;
                const {token, user} = await loginOnBackend({
                    userName: credentials.userName,
                    password: credentials.password,
                });
                return {
                    id: user.userId,
                    name: user.userName,
                    role: user.role as any,
                    accessToken: token,
                } as any;
            },
        }),
    ],
    callbacks: {
        async jwt({token, user, account}) {
            if (user) {
                if (account?.provider === "google") {
                    token.user = {
                        userId: 0,
                        userName: user.email as string,
                        role: "WORKER",
                    };
                    token.accessToken = account.access_token;
                } else {
                    token.user = {
                        userId: Number(user.id),
                        userName: user.name as string,
                        role: (user as any).role,
                    };
                    token.accessToken = (user as any).accessToken;
                }
            }
            return token;
        },
        async session({session, token}) {
            if (token?.user) {
                session.user = token.user as any;
            }
            if (token?.accessToken) {
                session.accessToken = token.accessToken;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
};