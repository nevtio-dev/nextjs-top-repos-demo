import GithubReposList from '@/components/github-repos-list'
import SignInModal from '@/components/modal/sign-in'
import PageContainer from '@/components/page-container'
import PageHeader from '@/components/page-header'
import PageHero from '@/components/page-hero'
import SignInBar from '@/components/sign-in-bar'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

export default async function Home() {
    const session = await getServerSession(authOptions)

    return (
        <div className="flex container mx-auto py-6 min-h-full">
            <PageContainer className="mx-auto w-full ">
                <PageHeader />
                <main>
                    <PageHero />
                    {session ? <GithubReposList /> : <SignInBar />}
                </main>
            </PageContainer>
            <SignInModal />
        </div>
    )
}
