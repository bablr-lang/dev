/* global global, console, URL, globalThis, process */

import '@bablr/record';

import '@bablr/agast-helpers/debug/register';
import { readFileSync } from 'node:fs';
import { buildModule } from 'bablr/enhanceable';
import { debugEnhancers } from '@bablr/helpers/enhancers';
import { evaluate } from '@bablr/io-vm-node';
import { eat, eatMatch, m, o } from '@bablr/helpers/grammar';
// import language from '@bablr/language-en-bablr-cli-verbose-output';
// import language from '@bablr/language-en-spamex';
// import language from '@bablr/language-en-regex-vm-pattern';
// import language from '@bablr/language-en-cstml';
// import language from '@bablr/language-en-json';
import language from '@bablr/language-en-esnext';
// import language from '@bablr/language-en-python';
// import JSX, { enhanceLanguageWithJSX } from '@bablr/language_enhancer-en-jsx';
// import Typescript from '@bablr/language_enhancer-en-typescript';
import {
  evaluateReturn,
  hoistTrivia,
  prettyGroupTags,
  printPrettyCSTML as printPrettyCSTMLStream,
  printSource as printTagsSource,
  transformStream,
  transformStreams,
  streamFromTree,
} from '@bablr/agast-helpers/stream';
import { printPrettyCSTML } from '@bablr/helpers/tree';

import {
  buildBindingTag,
  buildCloseNodeTag,
  buildGapTag,
  buildOpenNodeTag,
  buildReferenceTag,
  buildSpanEntry,
  buildToken,
  printSource,
  printTag,
  sourceTextFor,
  treeFromStream,
  treeFromString,
} from '@bablr/agast-helpers/tree';
import { embeddedSourceFrom } from '@bablr/helpers/source';
import * as BListKeyed from '@bablr/agast-helpers/b-list-keyed';
import { buildNullNode, buildPathSegment, Path, TagPath } from '@bablr/agast-helpers/path';
import { CloseNodeTag, OpenNodeTag } from '@bablr/agast-helpers/symbols';
import { freeze, freezeClass } from '@bablr/agast-helpers/object';
import { style } from '@bablr/cli/syntax';
import { writePrettyCSTML, writeCSTML } from '@bablr/helpers/builders';
global.printTag = printTag;

Error.stackTraceLimit = 20;

// let language = Typescript(language_);

let enhancers = {};

enhancers = {
  ...debugEnhancers,
  // createBablrStrategy: null,
  // bablrProduction: null,
};

let { streamParse, treeParse, buildTag } = buildModule(freeze(enhancers));

const input = readFileSync('play/fixture.js', 'utf8');

const matcher = m`<Program />`;
// const input = String.raw`foo.bar=false`;

// let tree = m`<Node /__?/ />`;

// let ml = buildTag(language, matcher);

// ml`<_> </>`;

// const input = embeddedSourceFrom(`"jsx({ children: "<//>" })"`);

// let tree = treeParse(language, matcher, input);
evaluateReturn(
  evaluate(() =>
    transformStreams(
      transformStream(
        streamParse(
          language,
          matcher,
          input,
          o({}),
          freeze({
            tree: true,
            emitEffects: true,
            // spans: BListKeyed.fromValues([
            //   buildSpanEntry('Trivia', null, '{ spaces: 2 }'),
            //   buildSpanEntry('Bare'),
            // ]),
            // holdShiftedNodes: true,
            // holdUndefinedAttributes: true,
          }),
        ),
        1,
        (tags) => writePrettyCSTML(tags, freeze({ format: false, indent: '  ' })),
      ),
      (tags) => style(tags),
    ),
  ),
);

// let tree = evaluateReturn(tags);

// let js = buildTag(language, m`<$Program />`, {}, { enhancers });

// console.log([...streamFromTree(tree, { unshift: true })].map(printTag).join('\n'));

// console.log(printPrettyCSTMLStream(tags));
// console.log(printPrettyCSTML(tree));
// console.log(printSource(tree));
// console.log(printTagsSource(tags));
// for (let tag of tags) {
//   console.log('\n' + printTag(tag));
// }

// console.log(printPrettyCSTMLStream(tags));

// let stream = [...tags];

// let printedTags = stream.map((tag) => printTag(tag));

// console.log(printPrettyCSTMLStream(stream));
// const tag = buildTag(language, matcher, { enhancers });

// const flags = tag.Flags`i`;
// console.log(printPrettyCSTML(tag`//${flags}`));

// console.log(printPrettyCSTML(tag`[null]`));
