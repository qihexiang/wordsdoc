import { afterMultiLineSplit } from './utils'
import { Word, Definition, Link } from './interfaces'

export const parse = (data: string, index: number): Word => {
    try {
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
            definitions: parseDefs(rawDefinitions),
            note: note ? note.split('\n') : undefined,
            links: rawLinks ? rawLinks.split('\n').map(parseLink) : undefined,
            relatives: rawRelatives ? rawRelatives.split('\n') : undefined
        }
    } catch (err) {
        console.log(`Error happend when parse paragraph ${index + 1}:\n`)
        data.split('\n').map(line => console.log(` \x1B[31m>\x1B[0m ${line}`))
        console.log()
        throw err
    }
}

const parseDefs = (rawDefinitions: string): Definition[] => {
    try {
        const rawDefStrs = rawDefinitions.split('...\n')
        return rawDefStrs
            .map(afterMultiLineSplit)
            .map(parseDef)
    } catch (err) {
        console.log('Failed to parse definitions.')
        throw err
    }
}

const parseDef = (rawDefinition: string, index: number): Definition => {
    try {
        const [defStr, ...examples] = rawDefinition.split('\n')
        const splitedDef = defStr.replace(/\n+$/, '').split('//')
        examples.map((item, index) => {
            if(item.match('//')) {
                console.log("\x1B[033mSYNTAX WARNING\x1B[0m")
                console.log(`Find a definition-like example at ${index + 1} line(s) after：`)
                console.log(` \x1B[36m>\x1B[0m ${defStr}`)
                console.log('as')
                console.log(` \x1B[36m>\x1B[0m ${item}`)
            }
        })
        if (splitedDef.length < 2) throw Error('INVALIDE DEFINITION')
        const hasWord = 2 in splitedDef
        return {
            word: hasWord ? splitedDef[0] : undefined,
            partOfSpeech: splitedDef[splitedDef.length - 2],
            description: splitedDef[splitedDef.length - 1],
            examples: examples.length ? examples : undefined
        }
    } catch (err) {
        console.log('\x1B[31m%s\x1B[0m', err.message)
        console.log(`at definition ${index + 1}\n`)
        rawDefinition.split('\n').map(line => console.log(` \x1B[36m>\x1B[0m ${line}`))
        console.log()
        throw err
    }
}

const parseLink = (rawLink: string, index: number): Link => {
    try {
        const [linkName, linkUrl] = rawLink.split(':::')
        if (!(linkName && linkUrl)) throw Error('INVALIDE LINK')
        return { linkName, linkUrl }
    } catch (err) {
        console.log('\x1B[31m%s\x1B[0m', err.message)
        console.log(`at link ${index + 1}\n`)
        console.log(` \x1B[36m>\x1B[0m ${rawLink}`)
        console.log()
        throw err
    }
}
