import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Check if credentials match (replace with your actual logic)
        if (
          credentials?.username === process.env.ADMIN_USERNAME &&
          credentials?.password === process.env.ADMIN_PASSWORD
        ) {
          // Return a user object if valid
          return { id: "1", name: "Admin", username: "admin" };
        }
        // Return null if invalid
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login", // Custom login page
  },
});

// Export the handler for GET and POST requests
export { handler as GET, handler as POST };