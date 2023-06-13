'use client'

import Image from 'next/image'

export default function PageHero() {
    return (
        <div className="relative mb-12">
            <div className='absolute h-full aspect-square top-0 right-6 z-0 opacity-25 md:opacity-75'>
                <Image
                    priority
                    alt='Github'
                    fill={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    src={'/images/github-hero.jpg'}
                ></Image>
            </div>
            <div className='relative z-10 w-1/2'>
                <h2 className="pt-24 pb-6">
                    <div className='text-6xl uppercase font-black'>TOP</div>
                    <div className='text-3xl font-bold'>GitHub Repositories</div>
                </h2>
                <p>As the most popular Git repository hosting platform, GitHub hosts more than 300 million repositories with a global community of over 100 million developers. The platform has become one of the best sources for free and useful software and web development resources.</p>
            </div>
        </div>
    )
}
