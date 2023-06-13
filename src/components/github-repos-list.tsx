'use client'

import { Repository } from '@/lib/graphql'
import { Button, Spinner } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import GithubRepoItem from '@/components/github-repo-item'

export default function GithubReposList() {
    const { status } = useSession()
    const [isFetching, setIsFetching] = useState(false)
    const [repos, setRepos] = useState<Repository[]>([])
    const [lastCursor, setLastCursor] = useState<string|null>(null)

    const fetchRepos = async ({ cursor } :{cursor: string | null}) => {
        const res = await fetch(`/api/repos?cursor=${cursor || ''}`, {
            cache: 'no-cache'
        })
        return res.json()
    }
    const next = () => {
        setIsFetching(true)
        fetchRepos({ cursor:lastCursor })
            .then(({ repos:newRepos, lastCursor:newLastCursor }:{repos:Repository[], lastCursor:string}) => {
                setRepos([...repos, ...newRepos])
                setLastCursor(newLastCursor)
                setIsFetching(false)
            })
            .catch(error => {
                console.error(error)
                setIsFetching(false)
            })
    }

    const onLoadMoreButtonClick = () => {
        next()
    }

    useEffect(() => {
        setRepos([])
        if (status === 'authenticated')
            next()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status])

    return (
        <>
            {status === 'loading' || isFetching ? <div className='flex items-center justify-center my-24'><Spinner size='xl' /></div> : null}
            {status === 'authenticated' ? (
                <>{repos.map((repo) => {
                    return <GithubRepoItem repo={repo} key={repo.id} />
                })}
                <div className='my-12 flex items-center justify-center'>
                    <Button isLoading={isFetching} onClick={onLoadMoreButtonClick} className="bg-blue-500 hover:bg-blue-300 text-white">Load More</Button>
                </div>
                </>
            ): null}
        </>

    )
}
