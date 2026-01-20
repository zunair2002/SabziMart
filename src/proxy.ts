import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

//Routes ko protect kr rhy hain

export async function proxy(req:NextRequest){
    //currently path of user
    const {pathname} = req.nextUrl
    const Publicroutes = ['/login','/register','/api/auth']
    //agr user route above walon sy start tu mean public hain
    if(Publicroutes.some((path)=>pathname.startsWith(path))){
        return NextResponse.next();
    }
    //protected routes
    const token = await getToken({req,secret:process.env.AUTH_SECRET})
    // console.log('Proxy may token: ',token);
    // console.log('Current URL: ',req.url);
    if(!token){
        const loginurl = new URL('/login',req.url)
        console.log(loginurl);
        loginurl.searchParams.set("callbackurl",req.url)
        return NextResponse.redirect(loginurl);
    }
    return NextResponse.next();
 }
 //we want that our middleware not run in every route optimize kr rhy ta kay in pr na chaly
     export const config = {
     matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
     }