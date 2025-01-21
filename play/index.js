/* global global, console, URL, globalThis, process */

import { spam, str, spam as m } from '@bablr/boot';
import { streamParse, buildTag, Context } from 'bablr/enhanceable';
import { debugEnhancers } from '@bablr/helpers/enhancers';
import { evaluateIO } from '@bablr/io-vm-node';
import * as language from '@bablr/language-en-regex-vm-pattern';
// import * as language from '@bablr/language-en-json';
import { generatePrettyCSTMLStrategy } from '@bablr/helpers/stream';
import { printPrettyCSTML } from '@bablr/helpers/tree';

import { printTag, streamFromTree } from '@bablr/agast-helpers/tree';
import { embeddedSourceFrom } from '@bablr/helpers/source';
import { buildIdentifier, buildString } from '@bablr/agast-vm-helpers';

let enhancers = {};

global.printTag = printTag;

enhancers = { ...debugEnhancers, enhancers };

// const input = embeddedSourceFrom(`'{
//     '<//>',
//     '<//>',
//     '<//>': 5555
//   }'`);

const input = String.raw`/[--]/`;

const matcher = spam`<$${buildString(language.canonicalURL)}:Pattern />`;
const ctx = Context.from(language, enhancers.bablrProduction);
const tokens = streamParse(ctx, matcher, input, {}, { enhancers, emitEffects: true });

console.log();

evaluateIO(() => generatePrettyCSTMLStrategy(tokens, { ctx, emitEffects: true }));

// const tag = buildTag(ctx, matcher, undefined, enhancers);

// console.log(printPrettyCSTML(tag`"'"`, { ctx }));
