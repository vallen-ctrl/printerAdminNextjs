"use client";
import LoginCom from "@/components/authCmponets"
import {signUp} from "@/auth-client"
import { redirect } from "next/navigation";
const SignUp = () =>{
    const callback = async (dat: {name:string, email: string, password:string}) =>{
        const {data, error} = await signUp.email({
            name: dat.name,
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
                <LoginCom issignUp={true} callbackValue={callback}redirectURL="/signIn"/>
            </div>
        </>
    )
}


export default SignUp