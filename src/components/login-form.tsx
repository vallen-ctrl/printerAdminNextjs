"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useEffect, useState } from "react"
import { signIn, useSession } from "@/auth-client"
import { useRouter, useSearchParams } from "next/navigation"
import { Box, CircularProgress, Stack } from "@mui/material"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [onRequest, setonRequset] =useState(false)
  const {data} = useSession()
  const searchParams = useSearchParams()
  const getParams = searchParams.get("authTrue") ?? false
  const handlerForm = (e:React.FormEvent) =>{
    e.preventDefault();
    signIn.email({
      email: email,
      password: password
    }, {
      onRequest:()=>{
        setonRequset(true)
      }
    })
  }
  

  useEffect(()=>{
    if(data?.session){
      if(getParams == "true") return window.close()
     router.push("/dashboard")
    }
  }, [data])


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlerForm}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={(e)=>setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input 
                id="password" 
                type="password" 
                onChange={(e)=>setPassword(e.target.value)}
                required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                   {onRequest? (<CircularProgress size={25}/>) :"Login" }
                </Button>
                {/* <Button variant="outline" className="w-full">
                  Login with Google
                </Button> */}
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
