import { adminClient } from "better-auth/client/plugins"
import {createAuthClient} from "better-auth/react"
export const {signIn, signUp, signOut, deleteUser, useSession, } = createAuthClient()