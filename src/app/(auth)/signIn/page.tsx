"use client";
import LoginCom from "@/components/authCmponets"
import {signIn} from "@/auth-client"
import { redirect } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
const Login = () =>{
    const [signIN, setSigninStat] = useState()

    const callback = async (dat: {name:string, email: string, password:string}) =>{
        const {data, error} = await signIn.email({
            email: dat.email,
            password:dat.password
        },{
            onRequest:()=>{
                Swal.fire({
                    title: "loading",
                    text: "waiting..",
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    showCancelButton:false,
                    didOpen: ()=>{
                        Swal.showLoading()
                    }
                })
            },
            onSuccess: () =>{
                Swal.close();
                redirect("/dashboard")
            },
            onError: (ctx) =>{
                Swal.fire({
                    title:"ERROR",
                    icon: "error",
                    text: ctx.error.message
                })
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