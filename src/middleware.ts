import { NextRequest, NextResponse } from "next/server";
import { getCookieCache } from "better-auth/cookies";
 
export async function middleware(request: NextRequest) {
	const session = await getCookieCache(request);
	if (!session) {
		return NextResponse.redirect(new URL("/login", request.url));
	}
	return NextResponse.next();
}   
 
export const config = {
	matcher: ["/dashboard"], // Specify the routes the middleware applies to
};