#!/usr/bin/env node
import { readFile, writeFile } from 'fs/promises'
import { parse } from './wd2'
import { basename, join, resolve } from 'path'
import { renderToString } from 'react-dom/server'
import { App } from './react'
import { clearComments } from './utils'

let [fileIn, fileOut] = process.argv.splice(2)
const title = basename(fileIn).replace(/\.wd2+$/, '')
if (process.platform == 'win32') {
    if (fileIn.match(/^\./)) fileIn = join(process.cwd(), fileIn)
    else fileIn = resolve(fileIn)
} else {
    if (!fileIn.match(/^\//)) fileIn = join(process.cwd(), fileIn)
}
if (!fileOut) fileOut = fileIn.replace(/\.wd2+$/, '.html')

const getData = () => readFile(fileIn, 'utf-8')
    .then(data => data.replace(/\r\n/g, '\n'))
    .then(clearComments)
    .then(data => data.replace(/\n{3,}/g, '\n\n'))
    .then(data => data.split('\n\n'))
    .then(data => data.map(parse))
    .then(data => ({ title, data }))

const loadTemplate = () => readFile(join(__dirname, '..', 'template.html'), 'utf-8')

const writeData = (data: string) => {
    return writeFile(fileOut, data, 'utf-8')
}

(async function main() {
    const data = await getData()
    const dom = renderToString(App(data))
    const temp = await loadTemplate()
    const rendered = temp.replace('{renderedTitle}', title).replace('{renderedDOM}', dom)
    return writeData(rendered)
})().catch(console.error)