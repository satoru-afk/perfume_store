import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Add your own authentication logic here
        const user = { id: "1", name: "Admin", username: "admin" }
        
        if (credentials?.username === process.env.ADMIN_USERNAME && 
            credentials?.password === process.env.ADMIN_PASSWORD) {
          return user
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }