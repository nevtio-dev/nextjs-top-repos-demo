'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { store } from '@/store'
import { Provider as ReduxProvider } from 'react-redux'
import { SessionProvider } from 'next-auth/react'

export function Providers({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <CacheProvider>
            <ChakraProvider>
                <ReduxProvider store={store}>
                    <SessionProvider>
                        {children}
                    </SessionProvider>
                </ReduxProvider>
            </ChakraProvider>
        </CacheProvider>
    )
}
