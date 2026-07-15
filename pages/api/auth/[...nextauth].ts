    import NextAuth, { type NextAuthOptions } from "next-auth"
    import CredentialsProvider from "next-auth/providers/credentials"

    export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Passwort", type: "password" },
        },
        async authorize(credentials) {
            // TODO: hier deinen Login prüfen (Sanity, eigene DB, Hardcoded etc.)
            if (!credentials?.email) return null

            return { id: "user-1", name: "User", email: credentials.email }
        },
        }),
    ],
    session: { strategy: "jwt" },
    }

    export default NextAuth(authOptions)