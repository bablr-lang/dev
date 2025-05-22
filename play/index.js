/* global global, console, URL, globalThis, process */

import { spam, str, i } from '@bablr/boot';
import { streamParse, buildTag, Context } from 'bablr/enhanceable';
import { debugEnhancers } from '@bablr/helpers/enhancers';
import { evaluateIO } from '@bablr/io-vm-node';
// import * as language from '@bablr/language-en-regex-vm-pattern';
import * as language from '@bablr/language-en-json';
// import * as language from '@bablr/language-en-scheme';
import { printPrettyCSTML as printPrettyCSTMLStream } from '@bablr/helpers/stream';
import { printPrettyCSTML } from '@bablr/helpers/tree';
import { generateCSTML } from '@bablr/cli/syntax';

import { evaluateReturnSync, printTag, streamFromTree } from '@bablr/agast-helpers/tree';
import { embeddedSourceFrom } from '@bablr/helpers/source';
import { buildIdentifier, buildString } from '@bablr/helpers/builders';
// import { writeCSTMLStrategy, writePrettyCSTMLStrategy } from '@bablr/agast-helpers/stream';

let enhancers = {};

global.printTag = printTag;

enhancers = { ...debugEnhancers, enhancers };

const input = String.raw`"hello"`;
// const input = embeddedSourceFrom(`'[ '<//>' ]'`);

const matcher = spam`<$${buildString(language.canonicalURL)}:${buildIdentifier('String')} />`;
const ctx = Context.from(language, enhancers.bablrProduction);

const tags = evaluateIO(() =>
  streamParse(ctx, matcher, input, {}, { enhancers, emitEffects: true }),
);

console.log();

//evaluateReturnSync(tags);

console.log(printPrettyCSTMLStream(tags, { ctx }));
// const tag = buildTag(ctx, matcher, undefined, enhancers);

// const flags = tag.Flags`i`;
// console.log(printPrettyCSTML(tag`${flags}`, { ctx }));
