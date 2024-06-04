/* global global, console, URL, globalThis, process */

import { pipeline } from 'node:stream/promises';
import { createWriteStream } from 'node:fs';
import indent from 'indent-string';
import { streamParse, buildTag } from 'bablr/enhanceable';
import { debugEnhancers } from '@bablr/helpers/enhancers';
import {
  streamFromTree,
  printPrettyCSTML as printPrettyCSTMLFromTree,
  printSource,
} from '@bablr/agast-helpers/tree';
import * as language from '@bablr/language-es3/regex';
// import * as language from '@bablr/language-json';
// import * as language from '@bablr/language-regex-vm-pattern';
// import * as language from '@bablr/language-bablr-vm-instruction';

// import { sourceText, language, type, props } from './fixture.js';
import { generateColorfulCSTML } from '@bablr/cli/syntax';

global.__printSource = printSource;

// console.log();
// console.log(`Input: \`${sourceText.replace(/[`\\]/g, '\\$&')}\``);
// console.log();

const tag = buildTag(language, 'Pattern', null);
// const expr = buildTag(language, 'Expression', {}, enhancers);

// const printed = printPrettyCSTML(
//   streamParse(language, 'Pattern', String.raw`/()\2/`, {}, debugEnhancers),
// );
// const tree = tag.Node`<Node></>`;
// const tree = tag`switch(null) { case default: throw new Error() }`;
const tree = tag`/()\2/`;
// const tree = tag`eat(/[ \t\r\n]+/)`;
const tokens = streamFromTree(tree);

console.log();

pipeline(generateColorfulCSTML(tokens), process.stdout);

// console.log(indent(printed, 2));

console.log();
