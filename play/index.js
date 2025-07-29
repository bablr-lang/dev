/* global global, console, URL, globalThis, process */

import { spam, str, i } from '@bablr/boot';
import { streamParse, buildTag } from 'bablr/enhanceable';
import { debugEnhancers } from '@bablr/helpers/enhancers';
import { evaluateIO } from '@bablr/io-vm-node';
import * as fs from 'node:fs';
// import * as language from '@bablr/language-en-regex-vm-pattern';
// import * as language from '@bablr/language-en-cstml';
// import * as language from '@bablr/language-en-c-comments';
// import * as language from '@bablr/language-en-ruby';
import * as language from '@bablr/language-en-es3';

import { printPrettyCSTML as printPrettyCSTMLStream } from '@bablr/agast-helpers/stream';
import { printPrettyCSTML } from '@bablr/helpers/tree';
import { generateCSTML } from '@bablr/cli/syntax';

import { evaluateReturnSync, printTag, streamFromTree } from '@bablr/agast-helpers/tree';
import { embeddedSourceFrom } from '@bablr/helpers/source';
import { buildIdentifier, buildString } from '@bablr/helpers/builders';
// import { writeCSTMLStrategy, writePrettyCSTMLStrategy } from '@bablr/agast-helpers/stream';

let input = fs.readFileSync('./play/fixture.js', 'utf-8');
let enhancers = {};

global.printTag = printTag;

// enhancers = { ...debugEnhancers, enhancers };

// const input = String.raw`/^$\b/`;
// const input = embeddedSourceFrom(`'[ '<//>' ]'`);

const matcher = spam`<$Program />`;

const tags = evaluateIO(() =>
  streamParse(language, matcher, input, {}, { enhancers, emitEffects: true }),
);

console.log();

//evaluateReturnSync(tags);

console.log(printPrettyCSTMLStream(tags));
// const tag = buildTag(language, matcher, undefined, enhancers);

// const flags = tag.Flags`i`;
// console.log(printPrettyCSTML(tag`${flags}`));
