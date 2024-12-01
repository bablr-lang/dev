/* global global, console, URL, globalThis, process */

import { spam, str, spam as m } from '@bablr/boot';
import { streamParse, buildTag, Context, AgastContext } from 'bablr/enhanceable';
import { debugEnhancers } from '@bablr/helpers/enhancers';
import { evaluateIO } from '@bablr/io-vm-node';
// import * as language from '@bablr/language-en-cstml';
import * as language from '@bablr/language-en-regex-vm-pattern';
import { generatePrettyCSTMLStrategy } from '@bablr/helpers/stream';
import { printPrettyCSTML } from '@bablr/helpers/tree';

import { streamFromTree } from '@bablr/agast-helpers/tree';
import { embeddedSourceFrom } from '@bablr/helpers/source';
import { buildString } from '@bablr/agast-vm-helpers';

let enhancers = {};

enhancers = { ...debugEnhancers, enhancers };

// const input = embeddedSourceFrom(`'{
//     '<//>',
//     '<//>',
//     '<//>': 5555
//   }'`);

const input = String.raw`/a/`;

const matcher = spam`<$${buildString(language.canonicalURL)}:Pattern />`;
const ctx = Context.from(AgastContext.create(), language, enhancers.bablrProduction);

const tokens = streamParse(ctx, matcher, input, {}, { enhancers, emitEffects: true });

console.log();

evaluateIO(() => generatePrettyCSTMLStrategy(tokens, { ctx, emitEffects: true }));

// const tag = buildTag(ctx, matcher);

// console.log(printPrettyCSTML(tag`null`, { ctx }));

// const { raw } = String;

// enhancers = debugEnhancers;

// const ctx = Context.from(AgastContext.create(), language, enhancers.bablrProduction);

// const buildCSTMLTag = (type) => {
//   const matcher = spam`<$${buildString(language.canonicalURL)}:${buildString(type)} />`;
//   return buildTag(ctx, matcher, undefined, { enhancers });
// };

// const print = (tree) => {
//   return printPrettyCSTML(tree, { ctx });
// };

// const cstml = buildCSTMLTag('Node');

// print(cstml`<Node>reference: null</>`);
