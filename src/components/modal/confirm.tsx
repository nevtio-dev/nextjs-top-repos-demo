'use client'

import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from '@chakra-ui/react'
import React, { useEffect } from 'react'

export default function ConfirmModal({
    open, onCancel, onConfirm, title, content, cancelButtonLabel = 'Cancel', confirmButtonLabel = 'Confirm'
}: {
    open: boolean,
    onCancel: () => void,
    onConfirm: () => void,
    title: string,
    content: string,
    cancelButtonLabel?: string,
    confirmButtonLabel?: string,
}) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef<any>()

    useEffect(() => {
        open ? onOpen() : onClose()
    }, [open, onOpen, onClose])

    const onCancelButtonClick = () => {
        onCancel()
    }
    const onConfirmButtonClick = () => {
        onConfirm()
    }

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent className='text-black'>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>{title}</AlertDialogHeader>
                    <AlertDialogBody>{content}</AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onCancelButtonClick}>{cancelButtonLabel}</Button>
                        <Button onClick={onConfirmButtonClick} className='bg-blue-500 hover:bg-blue-300 text-white' ml={3}>{confirmButtonLabel}</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}
