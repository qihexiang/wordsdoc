#!/usr/bin/env node
import { readFile, writeFile } from 'fs/promises'
import { basename, join, resolve } from 'path'
import { renderToString } from 'react-dom/server'

import { Word } from './interfaces'

import { parse, splitWords } from './wd2'
import { clearComments, clearMultiEmptyLine, crlf2lf } from './utils'
import { App } from './react'

let fileIn = process.argv[3]
const title = basename(fileIn).replace(/\.wd2+$/, '')
if (process.platform == 'win32') {
    if (fileIn.match(/^\./)) fileIn = join(process.cwd(), fileIn)
    else fileIn = resolve(fileIn)
} else {
    if (!fileIn.match(/^\//)) fileIn = join(process.cwd(), fileIn)
}
const fileOut = fileIn.replace(/\.wd2+$/, '.html')

const getData = () => readFile(fileIn, 'utf-8')
    .then(crlf2lf)
    .then(clearComments)
    .then(clearMultiEmptyLine)
    .then(splitWords)
    .then((data: string[]) => data.map(parse))
    .then((data: Word[]) => ({ title, data }))

const loadTemplate = () => readFile(join(__dirname, '..', 'template.html'), 'utf-8')

const writeData = (data: string) => {
    return writeFile(fileOut, data, 'utf-8')
}

(async function main(): Promise<void> {
    const data: { title: string, data: Word[] } = await getData()
    const dom: string = renderToString(App(data))
    const temp: string = await loadTemplate()
    const rendered: string = temp.replace('{renderedTitle}', title).replace('{renderedDOM}', dom)
    return writeData(rendered)
})().catch(console.error)