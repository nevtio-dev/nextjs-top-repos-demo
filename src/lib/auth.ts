import { SupabaseAdapter } from '@next-auth/supabase-adapter'
import jwt from 'jsonwebtoken'
import type { NextAuthOptions } from 'next-auth'
import { getServerSession }from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code'
                }
            }
        })
    ],
    adapter: SupabaseAdapter({
        url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
        secret: process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    }),
    callbacks: {
        async session({ session, token }) {
            const signingSecret = process.env.SUPABASE_JWT_SECRET
            if (signingSecret)
                session.supabaseAccessToken = jwt.sign(token, signingSecret)

            return session
        }
    }
}


export async function getServerSideSession() {
    return await getServerSession(authOptions)
}
