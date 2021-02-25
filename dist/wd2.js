"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
var utils_1 = require("./utils");
var parse = function (data) {
    var _a = data
        .split('---\n')
        .map(utils_1.afterMultiLineSplit), word = _a[0], rawDefinitions = _a[1], note = _a[2], rawLinks = _a[3], rawRelatives = _a[4];
    var result = {
        word: word,
        definitions: rawDefinitions.split('...\n')
            .map(utils_1.afterMultiLineSplit)
            .map(parseDef),
    };
    if (note)
        result.note = note.split('\n');
    if (rawLinks)
        result.links = rawLinks.split('\n')
            .map(parseLink);
    if (rawRelatives)
        result.relatives = rawRelatives
            .split('\n');
    return result;
};
exports.parse = parse;
var parseDef = function (rawDefinition) {
    var _a = rawDefinition.split('\n'), defStr = _a[0], example = _a.slice(1);
    var splitedDef = defStr.replace(/\n+$/, '').split('//');
    if (splitedDef.length === 3) {
        var word = splitedDef[0], partOfSpeech = splitedDef[1], description = splitedDef[2];
        return {
            word: word, partOfSpeech: partOfSpeech, description: description,
            exampleSentences: example
        };
    }
    else {
        var partOfSpeech = splitedDef[0], description = splitedDef[1];
        return {
            partOfSpeech: partOfSpeech, description: description,
            exampleSentences: example
        };
    }
};
var parseLink = function (rawLink) {
    var _a = rawLink.split('->'), linkName = _a[0], linkUrl = _a[1];
    return { linkName: linkName, linkUrl: linkUrl };
};
