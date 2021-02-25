import { afterMultiLineSplit } from './utils'

interface Definition {
    word?: string
    partOfSpeech: string
    description: string
    exampleSentences?: string[]
}

interface Link {
    linkName: string
    linkUrl: string
}

interface Word {
    word: string
    definitions: Definition[]
    note?: string[]
    links?: Link[]
    relatives?: string[]
}

export const parse = (data: string): Word => {
    const [
        word,
        rawDefinitions,
        note,
        rawLinks,
        rawRelatives
    ] = data
        .split('---\n')
        .map(afterMultiLineSplit)
    const result: Word = {
        word,
        definitions: rawDefinitions.split('...\n')
            .map(afterMultiLineSplit)
            .map(parseDef),
    }
    if (note) result.note = note.split('\n')
    if (rawLinks) result.links = rawLinks.split('\n')
        .map(parseLink)
    if (rawRelatives) result.relatives = rawRelatives
        .split('\n')
    return result
}

const parseDef = (rawDefinition: string): Definition => {
    const [defStr, ...example] = rawDefinition.split('\n')
    const splitedDef = defStr.replace(/\n+$/, '').split('//')
    if (splitedDef.length === 3) {
        const [word, partOfSpeech, description] = splitedDef
        return {
            word, partOfSpeech, description, exampleSentences: example
        }
    }
    else {
        const [partOfSpeech, description] = splitedDef
        return {
            partOfSpeech, description, exampleSentences: example
        }
    }
}

const parseLink = (rawLink: string): Link => {
    const [linkName, linkUrl] = rawLink.split(':::')
    return { linkName, linkUrl }
}
