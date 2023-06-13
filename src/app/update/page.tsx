import SignInModal from '@/components/modal/sign-in'
import PageContainer from '@/components/page-container'
import PageHeader from '@/components/page-header'
import ProfileForm from '@/components/profile-form'
import { authOptions } from '@/lib/auth'
import { SupabaseUser, prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'



export default async function Update() {
    const session = await getServerSession(authOptions)
    if (!session)
        return redirect('/')

    // Call supabase with prisma
    const user:SupabaseUser|null = await prisma.users.findFirst({
        where: {
            email: session.user.email
        }
    })
    if (!user)
        throw new Error('Not user found in Supabase database')

    // Server action to update supabase with prisma
    const onProfileUpdate = async (updatedUser: SupabaseUser) => {
        'use server'
        await prisma.users.update({
            where: {
                id: user.id
            },
            data: {
                username: updatedUser.username,
                title: updatedUser.title
            }
        })
    }

    return (
        <div className="flex container mx-auto py-6 min-h-full">
            <PageContainer className="mx-auto w-full ">
                <PageHeader />
                <main>
                    <div className='p-12 '>
                        <h1 className='text-3xl font-bold'>Your Profile</h1>
                        <br />
                        <ProfileForm user={user} onSubmit={onProfileUpdate}/>
                    </div>
                </main>
            </PageContainer>
            <SignInModal />
        </div>
    )
}
