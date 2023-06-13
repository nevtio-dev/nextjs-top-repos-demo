'use client'

import { SupabaseUser } from '@/lib/prisma'
import { Button, Input } from '@chakra-ui/react'
import Image from 'next/image'
import { useState } from 'react'

export default function ProfileForm({
    user,
    onSubmit
}: {
    user: SupabaseUser;
    onSubmit: (user: SupabaseUser) => Promise<void>;
}) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [username, setUsername] = useState(user.username || '')
    const [jobTitle, setJobTile] = useState(user.title || '')

    const onSubmitButtonClick = () => {
        const updatedUser = { ...user, username, title: jobTitle }
        setIsSubmitting(true)
        onSubmit(updatedUser)
            .then(() => {
                setIsSubmitting(false)
            })
            .catch((error) => {
                console.error(error)
                setIsSubmitting(false)
            })
    }

    return (
        <div className="bg-slate-200 p-6 rounded-md">
            <form className="flex flex-row">
                <div className="flex-initial">
                    <Image
                        priority
                        alt={user.name || ''}
                        width={150}
                        height={150}
                        src={user.image || ''}
                    ></Image>
                </div>
                <div className="flex-1 pl-6">
                    <div className="pb-6">
                        <label className="font-bold">Name</label>
                        <Input
                            variant="unstyled"
                            size="lg"
                            isReadOnly={true}
                            defaultValue={user.name || ''}
                        />
                    </div>

                    <div className="pb-6">
                        <label className="font-bold">Email Address</label>
                        <Input
                            variant="unstyled"
                            isReadOnly={true}
                            defaultValue={user.email || ''}
                        />
                    </div>

                    <div className="pb-6">
                        <label className="font-bold">Username</label>
                        <Input
                            className="border-2 border-blue-500"
                            variant={'outline'}
                            value={username}
                            isReadOnly={isSubmitting}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="pb-6">
                        <label className="font-bold">Job Title</label>
                        <Input
                            className="border-2 border-blue-500"
                            variant={'outline'}
                            value={jobTitle}
                            isReadOnly={isSubmitting}
                            onChange={(e) => setJobTile(e.target.value)}
                        />
                    </div>

                    <div className="my-6"></div>
                    <Button
                        isLoading={isSubmitting}
                        onClick={onSubmitButtonClick}
                        className="bg-blue-500 hover:bg-blue-300 text-white"
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    )
}
