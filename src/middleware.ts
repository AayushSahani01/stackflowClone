import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import getOrCreateDB from './models/server/dbSetup'
import { Users } from "node-appwrite";
import getStorage from "./models/server/dbSetup";
export async function middleware(request: NextRequest) {
    await Promise.all([
        getOrCreateDB(),
        getStorage()
    ])
    return NextResponse.next();
}

export const config = {
    //match all request paths except for the ones starting with
    // /api, /_next/static or /_next/data/favicon.ico
    matcher: [
        "/((?!api|_next/static|_next/data|favicon.ico).*)",
        '/login',
        '/register',
    ],
}