import { ApolloClient, HttpLink, InMemoryCache, gql } from '@apollo/client'

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string | number; output: string; }
    String: { input: string; output: string; }
    Boolean: { input: boolean; output: boolean; }
    Int: { input: number; output: number; }
    Float: { input: number; output: number; }
};

export type Forks = {
    __typename?: 'Forks';
    totalCount: Scalars['Int']['output'];
};

export type Language = {
    __typename?: 'Language';
    name: Scalars['String']['output'];
};

export type Owner = {
    __typename?: 'Owner';
    avatarUrl: Scalars['String']['output'];
};

export type Query = {
    __typename?: 'Query';
    searchPopularRepositories: Array<Repository>;
};

export type Repository = {
    __typename?: 'Repository';
    id: Scalars['ID']['output'];
    description?: Maybe<Scalars['String']['output']>;
    forks: Forks;
    name: Scalars['String']['output'];
    primaryLanguage?: Maybe<Language>;
    stargazerCount: Scalars['Int']['output'];
    url: Scalars['String']['output'];
    owner: Owner;
};

const typeDefs = gql`
type Repository {
    id: ID!
    name: String!
    description: String
    url: String!
    owner: Owner!
    stargazerCount: Int!
    forks: Forks!
    primaryLanguage: Language
}

type Forks {
    totalCount: Int!
}

type Language {
    name: String!
}

type Query {
    searchPopularRepositories: [Repository!]!
}

type Owner {
    avatarUrl: String!
}
`

const client = new ApolloClient({
    typeDefs,
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: 'https://api.github.com/graphql',
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN || ''}`
        }
    })
})

export const listGithubRepos = async (cursor: string): Promise<{ repos: Repository[], lastCursor:string }> => {
    const res = await client.query({
        query: gql`
            query($perPage:Int!, $cursor:String) {
                search(query: "stars:>1000", type: REPOSITORY, first: $perPage, after: $cursor) {
                    edges {
                        cursor
                        node {
                        ... on Repository {
                                id
                                name
                                description
                                url
                                owner {
                                    avatarUrl
                                }
                                stargazerCount
                                forks {
                                    totalCount
                                }
                                primaryLanguage {
                                    name
                                }
                            }
                        }
                    }
                }
            }
            `,
        variables: { perPage: 10, cursor: cursor !== '' ? cursor : null }
    })
    const edges = res.data.search.edges as any[]
    const lastCursor = edges.at(-1).cursor
    return { repos: edges.map((edge) => edge.node), lastCursor }
}
