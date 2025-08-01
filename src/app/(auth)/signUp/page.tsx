"use client";
import LoginCom from "@/components/authCmponets"
import { signUp } from "@/auth-client"
import { redirect, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
const SignUp = () => {
    const searchParams = useSearchParams();
    const authTrue = searchParams.get("authTrue") ?? "/dashboard";
    const callback = async (dat: { name: string, email: string, password: string }) => {
        Swal.fire({
            title: "loading",
            text: "waiting..",
            allowEscapeKey: false,
            allowOutsideClick: false,
            showCancelButton: false,
            didOpen: () => {
                Swal.showLoading()
            }
        })

        const { data, error } = await signUp.email({
            name: dat.name,
            email: dat.email,
            password: dat.password,
        })

        if (error) {
            return Swal.fire({
                title: "Eror",
                text: error.message,
                icon: "error"
            })
        }

        Swal.close();
        redirect(authTrue)
    }

    const rederectURL = `/signIn?authTrue=${authTrue}`

    return (
        <>
            <div className="flex w-full h-[100vh] justify-center items-center">
                <LoginCom issignUp={true} callbackValue={callback} redirectURL={rederectURL} />
            </div>
        </>
    )
}


export default SignUp