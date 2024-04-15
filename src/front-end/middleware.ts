import {NextRequest} from "next/server";
import {jwtDecode} from "jwt-decode";
import {getTimestampInSeconds} from "@/lib/utils";

export function middleware(request: NextRequest){

    const token = request.cookies.get('token')?.value;
    try {
        if (token !== undefined){
            console.log(token)
            const decoded = jwtDecode(token);
            if ((decoded.exp?decoded.exp:0) < getTimestampInSeconds()) {
                console.log('JWT expired', request.nextUrl.pathname);
                return Response.redirect(new URL('/log-in', request.url));
            }
        }else {
            return Response.redirect(new URL('/log-in', request.url));
        }
    } catch (error) {
        console.log(error)
        return Response.redirect(new URL('/log-in', request.url));

    }
    // if (!token && !request.nextUrl.pathname.startsWith('/log-in')) {
    //     return Response.redirect(new URL('/log-in', request.url));
    // }

}

export const config = {
    matcher: ['/((?!api|_next/static|favicon.ico|log-in|_next/image|.*\\.png$).*)'],
}