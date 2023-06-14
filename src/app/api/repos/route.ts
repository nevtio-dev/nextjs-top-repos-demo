import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { listGithubRepos } from '@/lib/graphql'

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session) return new NextResponse('Unauthorised', { status: 401 })

    const cursor = new URL(req.url).searchParams.get('cursor')
    const data = await listGithubRepos(cursor || '')

    // const data = [{ value:1 }, { value:2 }, { value:3 }]

    return NextResponse.json(data)
}
