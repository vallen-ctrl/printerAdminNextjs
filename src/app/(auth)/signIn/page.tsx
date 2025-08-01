"use client";
import LoginCom from "@/components/authCmponets"
import { signIn } from "@/auth-client"
import { redirect, useSearchParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
const Login = () => {
    const searchParams = useSearchParams();
    const authTrue = searchParams.get("authTrue") ?? "/dashboard"; // fallback kalau null

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

        const { data, error } = await signIn.email({
            email: dat.email,
            password: dat.password
        }, {
            onSuccess: (e) => {
                Swal.close();
                redirect("/dashboard");
            },
            onError: (e) => {
                Swal.fire({
                title: "Eror",
                text: e.error.message,
                icon: "error"
            })
            }

        })




    }

    const rederectURL = `/signUp?authTrue=${authTrue}`

    return (
        <>
            <div className="flex w-full h-[100vh] justify-center items-center">
                <LoginCom issignUp={false} callbackValue={callback} redirectURL={rederectURL} />
            </div>
        </>
    )
}


export default Login