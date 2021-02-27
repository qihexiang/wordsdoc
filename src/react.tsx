import React from 'react'
import { Word, Definition, Link } from './interfaces'

function DefWord(props: { word: string | undefined }) {
    if (!props.word) return null
    return (<strong>{props.word} </strong>)
}
function Examples(props: { examples: Definition["examples"] }) {
    if (!props.examples) return null
    return (
        <div>
            <h4>例句</h4>
            <div>{
                props.examples.map((example, index) => {
                    return (
                        <p key={index}><i>{example}</i></p>
                    )
                })
            }</div>
        </div>
    )
}
function Definitions(props: { defs: Definition[] }) {
    return (
        <div className="item">
            <h3>释义</h3>
            {
                props.defs.map((def, index) => {
                    return (
                        <div key={index}>
                            <p>
                                <strong>{index + 1} </strong>
                                <DefWord word={def.word} />
                                <i>{def.partOfSpeech}.</i>
                                <span>{def.description}</span>
                            </p>
                            <Examples examples={def.examples} />
                        </div>
                    )
                })
            }
        </div>
    )
}
function Note(props: { note: string[] | undefined }) {
    if (!props.note) return null
    return (
        <div className="item">
            <h3>说明</h3>
            {
                props.note.map((para, index) => <p key={index}>{para}</p>)
            }
        </div>
    )
}
function Links(props: { links: Link[] | undefined }) {
    if (!props.links) return null
    return (
        <div className="item">
            <h3>链接</h3>
            {
                props.links.map((link, index) => {
                    return <span key={index}><a href={link.linkUrl} target="_blank">{link.linkName}</a> </span>
                })
            }
        </div>
    )
}
function Rels(props: {rels: string[] | undefined}) {
    if (!props.rels) return null
    return (
        <div className="item">
            <h3>相关单词</h3>
            <p>{
                props.rels.map((rel, index) => {
                    return <span key={index}><a href={'#' + rel}>{rel}</a> </span>
                })
            }</p>
        </div>
    )
}
function WordCard(props: {wordObj: Word}) {
    const { word, definitions, note, links, relatives } = props.wordObj
    return (
        <div id={word} className="card">
            <h2>{word}</h2>
            <Definitions defs={definitions} />
            <Note note={note} />
            <Links links={links} />
            <Rels rels={relatives} />
        </div>
    )
}

export function App(props: {title: string, data: Word[]}) {
    return (
        <div id="main">
            <header className="card">
                <h1>{props.title}</h1>
            </header>
            <div id="wordList">{
                props.data.map((wordObj, index) => {
                    return <WordCard wordObj={wordObj} key={index} />
                })
            }</div>
        </div>
    )
}