'use client'

import { Link } from '@chakra-ui/react'
import HeaderNav from './header-nav'
import GithubIcon from './icon/GithubIcon'

export default function PageHeader() {
    return (
        <header className="flex justify-end items-center">
            <h1 className="flex-auto">
                <Link href="/"><GithubIcon width={48} height={48}></GithubIcon></Link>
                <span className="hidden">Top Github Repositories</span>
            </h1>
            <HeaderNav className="flex-initial flex space-x-6"></HeaderNav>
        </header>
    )
}
