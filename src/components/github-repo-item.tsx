'use client'

import { Repository } from '@/lib/graphql'
import { StarIcon } from '@chakra-ui/icons'
import {
    Card,
    CardBody,
    Heading,
    Link,
    Stat,
    StatLabel,
    StatNumber
} from '@chakra-ui/react'
import Image from 'next/image'

export default function GithubRepoItem({ repo }: { repo: Repository }) {

    return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow="hidden"
            variant="outline"
            className="my-6 bg-slate-100"
        >
            <Image
                priority
                alt={repo.name}
                width={150}
                height={150}
                src={repo.owner.avatarUrl}
            ></Image>

            <CardBody>
                <Heading size="md" className='pb-3 text-xl'>{repo.name}</Heading>
                <p>{repo.description}</p>
                <Link className='text-blue-300' href={repo.url} target='_blank'>{repo.url}</Link>

                <div className="mt-3 grid grid-cols-3 divide-x-2">
                    <div className='py-3'>
                        <Stat>
                            <StatLabel className='items-center flex'><StarIcon className='text-yellow-500 mr-3'/>Star Count</StatLabel>
                            <StatNumber className='text-blue-500'>{repo.stargazerCount}</StatNumber>
                        </Stat>
                    </div>
                    <div className='p-3'>
                        <Stat>
                            <StatLabel>Forks Count</StatLabel>
                            <StatNumber>{repo.forks.totalCount}</StatNumber>
                        </Stat>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}
