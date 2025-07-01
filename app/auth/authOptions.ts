import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma";
import {NextAuthConfig} from "next-auth"


const authOptions:NextAuthConfig={
  callbacks: {
    authorized({ auth, request }) {
      // Only allow users with a session
      return !!auth?.user
    },
  },
 adapter: PrismaAdapter(prisma),
  providers: [Google],
}

export default authOptions