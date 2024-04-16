import {NextRequest} from "next/server";
import {jwtDecode} from "jwt-decode";
import {getTimestampInSeconds, isUserLoggedIn} from "@/lib/utils";

export function middleware(request: NextRequest){

    const token = request.cookies.get('token')?.value;
    if (!isUserLoggedIn(token)) {
        return Response.redirect(new URL('log-in', request.url))
    }

}

export const config = {
    matcher: ['/((?!api|_next/static|favicon.ico|log-in|_next/image|.*\\.png$).*)'],
}