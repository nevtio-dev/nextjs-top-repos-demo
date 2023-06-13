'use client'

import UserIcon from '@/components/icon/UserIcon'
import { setSignInModalOpen } from '@/store/app'
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useDispatch } from 'react-redux'
import ProfileIcon from './icon/ProfileIcon'
import SignOutIcon from './icon/SignOutIcon'
import ConfirmModal from './modal/confirm'
import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'

export default function HeaderNav({ className }: { className?: string }) {
    const { data: session } = useSession()
    const router = useRouter()
    const [signOutConfirmOpen, setSignOutConfirmOpen] = useState(false)

    const dispatch = useDispatch()

    const onUserButtonClick = () => {
        router.push('/update')
    }
    const onSignInButtonClick = () => {
        dispatch(setSignInModalOpen(true))
    }
    const onSignOutButtonClick = () => {
        setSignOutConfirmOpen(false)
        signOut()
    }

    return (
        <>
            <nav className={className}>
                {session ? (
                    <Menu>
                        <MenuButton
                            as={Button}
                            leftIcon={<UserIcon />}
                            className="bg-blue-500 hover:bg-blue-300 text-white"
                        >
                            {session.user.name}
                        </MenuButton>
                        <MenuList>
                            <MenuItem
                                className="justify-start"
                                minH="48px"
                                leftIcon={<ProfileIcon />}
                                as={Button}
                                onClick={onUserButtonClick}
                            >
                                Your Profile
                            </MenuItem>
                            <MenuItem
                                className="justify-start"
                                minH="48px"
                                leftIcon={<SignOutIcon />}
                                as={Button}
                                onClick={() => setSignOutConfirmOpen(true)}
                            >
                                Sign Out
                            </MenuItem>
                        </MenuList>
                    </Menu>
                ) : (
                    <Button
                        onClick={onSignInButtonClick}
                        className="bg-blue-500 hover:bg-blue-300 text-white"
                    >
                        Sign In
                    </Button>
                )}
            </nav>
            <ConfirmModal
                open={signOutConfirmOpen}
                onCancel={() => setSignOutConfirmOpen(false)}
                onConfirm={onSignOutButtonClick}
                title={'Sign Out'}
                content={'Are you sure you want to sign out?'}
            />
        </>
    )
}
