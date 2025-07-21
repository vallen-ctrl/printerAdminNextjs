"use client";
import LoginCom from "@/components/authCmponets"
import {signIn} from "@/auth-client"
import { redirect } from "next/navigation";
const Login = () =>{
    const callback = async (dat: {name:string, email: string, password:string}) =>{
        const {data, error} = await signIn.email({
            email: dat.email,
            password:dat.password
        },{
            onSuccess: () =>{
                redirect("/dashboard")
            },
            onError: (ctx) =>{
                alert(ctx.error.message)
            }
        })
    }

    return(
        <>
            <div className="flex w-full h-[100vh] justify-center items-center">
                <LoginCom issignUp={false} callbackValue={callback} redirectURL="/signUp"/>
            </div>
        </>
    )
}


export default Login