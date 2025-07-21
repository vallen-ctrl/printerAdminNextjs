"use client";
import { signOut } from "@/auth-client"
import { redirect } from "next/navigation"


export default function () {
    const handler = async() =>{
        signOut({fetchOptions:{onSuccess:()=>{
            redirect("/")
        }}})
    }

    return (<>
        <div className="flex flex-col w-full h-[100vh] justify-center items-center"><p>this is dasboard</p> <button onClick={handler}>SIGN OUT</button></div>
        
    </>)
}

