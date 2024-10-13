import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "./db";
import { User } from "./models";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const login = async (credentials: Partial<Record<"username" | "password", unknown>>, callbackFn: (user: any) => void) => {
  try {
    connectToDb();
    const user = await User.findOne({ name: credentials.username });
    if (!user) throw new Error("Wrong credentials!");
      
    const isPasswordCorrect = bcrypt.compare(
      credentials.password as string,
      user.password
    );

    if (!isPasswordCorrect) throw new Error("Wrong credentials!");
    const user2 =  {
      id: user._id,
      name: user.name,
      email: user.email
    };

    callbackFn(user2)
    
  } catch (err) {
    console.log(err);
    throw new Error("Failed to login!");
  }
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Your username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          let user;
          await login(credentials, (currentUser) => {
            user = currentUser;
          });
          return user;
        } catch (err) {
          console.log(err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
  },
});