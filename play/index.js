/* global global, console, URL, globalThis, process */

import * as fs from 'node:fs';
import { spam, cstml, str, i } from '@bablr/boot';
import { streamParse, buildTag } from 'bablr/enhanceable';
import { debugEnhancers } from '@bablr/helpers/enhancers';
import { evaluateIO } from '@bablr/io-vm-node';

// import * as language from '@bablr/language-en-regex-vm-pattern';
// import * as language from '@bablr/language-en-cstml';
// import * as language from '@bablr/language-en-c-comments';
import * as language from '@bablr/language-en-ruby';
// import * as language from '@bablr/language-en-es3';

import { Path } from '@bablr/agast-helpers/path';
import { printPrettyCSTML as printPrettyCSTMLStream } from '@bablr/agast-helpers/stream';
import { printPrettyCSTML } from '@bablr/helpers/tree';
import { generateCSTML } from '@bablr/cli/syntax';

import {
  evaluateReturnSync,
  printTag,
  streamFromTree,
  printSource,
} from '@bablr/agast-helpers/tree';
import { embeddedSourceFrom } from '@bablr/helpers/source';
import { buildIdentifier, buildString } from '@bablr/helpers/builders';

import { buildModule } from '@bablr/btree/enhanceable';
const { push, removeAt, addAt, concat } = buildModule(2);

let input = fs.readFileSync('./play/fixture.cstml', 'utf-8');
let enhancers = {};

global.printTag = printTag;

enhancers = { ...debugEnhancers, enhancers };

// const input = String.raw`true`;
// const input = embeddedSourceFrom(`'[ '<//>' ]'`);

// const matcher = spam`<Document />`;
// console.log(matcher);
const source = cstml.Document({ raw: [input] });
// const tags = evaluateIO(() =>
//   streamParse(language, matcher, input, {}, { enhancers, emitEffects: true }),
// );

console.log(printPrettyCSTML(source));

//evaluateReturnSync(tags);

// console.log(printPrettyCSTMLStream(tags));
// const tag = buildTag(language, matcher, undefined, enhancers);

// const flags = tag.Flags`i`;
// console.log(printPrettyCSTML(tag`${flags}`));

/* Test for replaceAt */

// let js = buildTag(language);
// let target = js.Program`alert("hello, world!");`;
// let message = js`"hello, world!"`;

// let program = js.Program`console.log(${message});`;

// let transformed = Path.from(program).replaceAt(['body', 0, 'expression', 'callee'], js`alert`).node;
// debugger;
// console.log(printSource(transformed));
// console.log(printPrettyCSTML(transformed));
// console.log(printPrettyCSTML(program) !== printPrettyCSTML(transformed));

/* Test for btree */

// let tree1 = [1, ['a']];
// let tree5 = [
//   5,
//   [
//     [3, [['a', 'b'], ['c']]],
//     [2, [['d', 'e']]],
//   ],
// ];
// console.log(concat(tree1, tree1));
