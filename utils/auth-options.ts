import { getMe, login } from "@/services/auth.service";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const response = await login(credentials.email, credentials.password);

          if (response.success && response.payload) {
            const tokens = response.payload;
            // console.log(tokens);
            const userResponse = await getMe(tokens.access_token);
            if (userResponse.success && userResponse.payload) {
              const role = userResponse.payload.role.key;
              const user = userResponse.payload.user;
              return {
                id: user.id,
                name: user.first_name,
                email: credentials.email,
                img_url: user.profile_image_url || undefined,
                role: role,
                accessToken: tokens.access_token,
                refreshToken: tokens.refresh_token,
              };
            } else {
              return null;
            }
          } else {
            return null;
          }
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Handle Google sign-in
      if (account?.provider === "google") {
        // You can add custom logic here to handle Google users
        // For example, check if user exists in your database
        console.log("Google sign-in attempt:", { user, account, profile });
        return true; // Allow sign-in
      }
      return true;
    },

    async jwt({ token, user, trigger, session }) {
      // Initial sign in
      if (user) {
        // token.accessToken = user.accessToken;
        // token.refreshToken = user.refreshToken;
        token.email = user.email;
        token.id = user.id;
        token.name = user.name;
        // token.img_url = user.img_url;
        // token.role = user.role;
        return token;
      }

      // Handle token updates when session is updated
      if (trigger === "update" && session?.accessToken) {
        token.accessToken = session.accessToken;
        token.refreshToken = session.refreshToken;
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          // id: token.id as string,
          email: token.email as string,
          name: session.user?.name || "",
          // img_url: token.img_url as string,
          // role: token.role as string,
        };
        // session.accessToken = token.accessToken as string;
        // session.refreshToken = token.refreshToken as string;
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    signOut: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
