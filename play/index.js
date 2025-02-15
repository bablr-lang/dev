/* global global, console, URL, globalThis, process */

import { spam, re, str, spam as m, i } from '@bablr/boot';
import { streamParse, buildTag, Context } from 'bablr/enhanceable';
import { debugEnhancers } from '@bablr/helpers/enhancers';
import { evaluateIO } from '@bablr/io-vm-node';
// import * as language from '@bablr/language-en-regex-vm-pattern';
import * as language from '@bablr/language-en-cstml-json';
// import * as language from '@bablr/language-en-bablr-cli-verbose-output';
import { printPrettyCSTML as printPrettyCSTMLStream } from '@bablr/helpers/stream';
import { printPrettyCSTML } from '@bablr/helpers/tree';
import { generateCSTML } from '@bablr/cli/syntax';

import {
  evaluateReturnSync,
  printTag,
  sourceTextFor,
  streamFromTree,
  treeFromStream,
} from '@bablr/agast-helpers/tree';
import { embeddedSourceFrom } from '@bablr/helpers/source';
import { buildIdentifier, buildString } from '@bablr/helpers/builders';
import { writeCSTMLStrategy, writePrettyCSTMLStrategy } from '@bablr/agast-helpers/stream';

let enhancers = {};

global.printTag = printTag;

enhancers = { ...debugEnhancers, enhancers };

// const input = embeddedSourceFrom(`'{
//     '<//>',
//     '<//>',
//     '<//>': 5555
//   }'`);

// const match = re`/-?\d/`;

// console.log(printPrettyCSTML(match.value.properties.alternatives[0].node));

// const input = `/21/`;

// const input = embeddedSourceFrom(`'[ '<//>' ]'`);
const input = embeddedSourceFrom(`'[ { num: 5555, str: "hello world",\n    gap: '<//>'\n  }\n]'`);

const matcher = spam`<$${buildString(language.canonicalURL)}:Expression />`;
const ctx = Context.from(language, enhancers.bablrProduction);
// const tags = evaluateIO(() =>
//   generateCSTML(streamParse(ctx, matcher, input, {}, { enhancers, emitEffects: true }), {
//     ctx,
//     color: true,
//     emitEffects: true,
//   }),
// );
// const tags = (function* (tags) {
//   let iter = tags[Symbol.iterator]();
//   let step = iter.next();
//   while (!step.done) {
//     console.log();
//     console.log(printTag(step.value));
//     yield step.value;
//     step = iter.next();
//   }
//   return step.value;
// })(evaluateIO(() => streamParse(ctx, matcher, input, {}, { enhancers, emitEffects: true })));

const tags = evaluateIO(() =>
  streamParse(ctx, matcher, input, {}, { enhancers, emitEffects: true }),
);

const tree = evaluateReturnSync(tags);

console.log();

console.log(printPrettyCSTML(tree, { ctx }));

// for (const tag of streamFromTree(tree.properties['.'].node.properties.alternatives[0].node)) {
//   console.log(printTag(tag));
// }
// console.log(printPrettyCSTMLStream(tags, { ctx }));

// const tag = buildTag(ctx, matcher, undefined, enhancers);

// const flags = tag.Flags`i`;
// console.log(printPrettyCSTML(tag`//${flags}`, { ctx }));
