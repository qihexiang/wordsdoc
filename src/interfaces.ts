export interface Definition {
    word: string | undefined
    partOfSpeech: string
    description: string
    examples?: string[] | undefined
}

export interface Link {
    linkName: string
    linkUrl: string
}

export interface Word {
    word: string
    definitions: Definition[]
    note: string[] | undefined
    links: Link[] | undefined
    relatives: string[] | undefined
}