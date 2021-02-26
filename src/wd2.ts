import { afterMultiLineSplit } from './utils'
import { Word, Definition, Link } from './interfaces'

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
    return {
        word,
        definitions: rawDefinitions.split('...\n')
            .map(afterMultiLineSplit)
            .map(parseDef),
        note: note ? note.split('\n'): undefined,
        links: rawLinks ? rawLinks.split('\n').map(parseLink) : undefined,
        relatives: rawRelatives? rawRelatives.split('\n') : undefined
    }
}

const parseDef = (rawDefinition: string): Definition => {
    const [defStr, ...examples] = rawDefinition.split('\n')
    const splitedDef = defStr.replace(/\n+$/, '').split('//')
    const hasWord = 2 in splitedDef
    return {
        word: hasWord ? splitedDef[0] : undefined,
        partOfSpeech: splitedDef[splitedDef.length - 2],
        description: splitedDef[splitedDef.length - 1],
        examples: examples.length ? examples : undefined
    }
}

const parseLink = (rawLink: string): Link => {
    const [linkName, linkUrl] = rawLink.split(':::')
    return { linkName, linkUrl }
}
