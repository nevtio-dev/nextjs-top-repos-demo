'use client'

import GithubIcon from '@/components/icon/GithubIcon'
import GoogleIcon from '@/components/icon/GoogleIcon'
import { RootState } from '@/store'
import { setSignInModalOpen } from '@/store/app'
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    VStack,
    useDisclosure
} from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function SignInModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLoading, setIsLoading] = useState(false)
    const signInModalOpen = useSelector((state: RootState) => state.app.signInModalOpen)
    const dispatch = useDispatch()

    const onSignInGoogleButtonClick = () => {
        setIsLoading(true)
        signIn('google')
    }
    const onModalClose = () => {
        if (!isLoading) dispatch(setSignInModalOpen(false))
    }

    useEffect(() => {
        if (signInModalOpen !== isOpen)
            signInModalOpen ? onOpen() : onClose()
    }, [isOpen, onClose, onOpen, signInModalOpen])

    return (
        <Modal
            closeOnOverlayClick={false}
            isOpen={signInModalOpen}
            onClose={onModalClose}
            size={'xl'}
        >
            <ModalOverlay />
            <ModalContent className="text-black">
                <ModalHeader className="text-center p-6">
                    <h2 className="text-2xl font-bold">Sign In</h2>
                    <div className="p-6">
                        <GithubIcon
                            width={96}
                            height={96}
                            className="mx-auto"
                        ></GithubIcon>
                    </div>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody className="text-center mb-12">
                    <div className="text-sm mb-6">
                            Hello and Welcome, Please sign-in with the following
                            methods
                    </div>
                    <VStack>
                        <Button
                            isLoading={isLoading}
                            onClick={onSignInGoogleButtonClick}
                            leftIcon={<GoogleIcon />}
                            className="bg-red-800 hover:bg-red-500 text-white"
                        >
                                Sign-In with Google Account
                        </Button>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
