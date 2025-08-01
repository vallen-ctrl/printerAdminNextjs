// app/api/sdaa/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getCookieCache } from "better-auth/cookies";

export interface productchekBuy{
  name: string,
  id: string
}

export async function GET(req: NextRequest) {
  const cookie = await getCookieCache(req);
  console.log(cookie);
  
  if(!cookie) return NextResponse.json("plase SignIn Frist", {status:400})
  const datasend = {
    name: cookie.user.name,
    id: cookie.user.id
  }
  return NextResponse.json(datasend, {status:200})
}