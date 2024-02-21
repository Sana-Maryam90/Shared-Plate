import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
    console.log("middleware executed");
    const token = request.cookies.get('token')?.value;
    console.log(token);

    // const loggedInUserNotAccessPaths = 
    // request.nextUrl.pathname === "/login" ||
    // request.nextUrl.pathname === "/signup";

    // if (loggedInUserNotAccessPaths){
    //   // accessing not secured route
    //   if(token){
    //     return NextResponse.redirect(new URL('/account', request.url));
    //   }
    // }else{
    //   // accessing secured route
    //   // Perform authentication check based on the token
    //   if(!token){
    //     // Redirect the user to the login page if the token is missing
    //     return NextResponse.redirect(new URL('/login', request.url));
    //   }
    // }

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/login','/signup','/take', '/account','/give','/api/:path*'],
}