import connectDB from "@/config/db";
import User from "@/models/User";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
var bcrypt = require('bcryptjs')
export const authOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                },
                password: {
                    label: "Password",
                    type: "password"
                },
            },
            async authorize(credentials) {
                await connectDB();

                try {
                    const user = await User.findOne({ email: credentials.email });
                    console.log(user)
                    if (user) {
                        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
                        if (isPasswordCorrect) {
                            return user
                        }
                    }
                } catch (error) {
                    throw new Error(error)
                }
            },
        }),
    ],

    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider == 'credentials') {
                return user;
            }
        }
    }
}

export const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }