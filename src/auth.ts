import { betterAuth } from "better-auth";
import {prismaAdapter} from "better-auth/adapters/prisma"
import {PrismaClient} from "../generated/prisma"
import {nextCookies} from "better-auth/next-js"
import { admin } from "better-auth/plugins";

const prisma = new PrismaClient();
export default prisma
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite"
  }),user:{
    deleteUser: {
      enabled: true
    }
  },
  emailAndPassword:{
    enabled:true
  },
  session:{
    cookieCache:{
      enabled: true,
      maxAge: 5*60  
    },
    expiresIn: 60*60*60*7 // detik*menit*jam*hari
  },
  plugins: [nextCookies()],

});