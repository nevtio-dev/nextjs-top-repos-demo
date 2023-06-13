'use client'

import { Button } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { setSignInModalOpen } from '@/store/app'

export default function SignInBar() {

    const dispatch = useDispatch()
    const onSignInButtonClick = () => {
        dispatch(setSignInModalOpen(true))
    }

    return (
        <div className="bg-slate-200 p-6 rounded-md text-center">
            <p className="pb-3">Hello and welcome! Please sign-in</p>
            <Button onClick={onSignInButtonClick} className="bg-blue-500 hover:bg-blue-300 text-white">Sign In</Button>
        </div>
    )
}
