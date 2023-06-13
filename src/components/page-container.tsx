'use client'

import { Card, CardBody } from '@chakra-ui/react'

export default function PageContainer({
    children,
    className
}: {
    children?: React.ReactNode,
    className?: string
}) {
    return (
        <Card maxW={'6xl'} className={`drop-shadow-2xl shadow-2xl ${className || ''}`}>
            <CardBody className="">
                {children}
            </CardBody>
        </Card>
    )
}
