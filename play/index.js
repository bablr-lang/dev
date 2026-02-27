/* global global, console, URL, globalThis, process */

import { readFileSync } from 'node:fs';
import { spam as m, i, re, cst, t, parse } from '@bablr/boot';
import cstml from '@bablr/boot/languages/cstml';
import { buildModule } from 'bablr/enhanceable';
import { debugEnhancers } from '@bablr/helpers/enhancers';
import { evaluateIO } from '@bablr/io-vm-node';
import { o } from '@bablr/helpers/grammar';
// import language from '@bablr/language-en-bablr-cli-verbose-output';
// import language from '@bablr/language-en-spamex';
// import language from '@bablr/language-en-regex-vm-pattern';
// import language from '@bablr/language-en-cstml';
// import language from '@bablr/language-en-json';
import language from '@bablr/language-en-es3';
// import JSX, { enhanceLanguageWithJSX } from '@bablr/language_enhancer-en-jsx';
// import Typescript from '@bablr/language_enhancer-en-typescript';
import {
  asyncStringFromStream,
  hoistTrivia,
  prettyGroupTags,
  printPrettyCSTML as printPrettyCSTMLStream,
} from '@bablr/agast-helpers/stream';
import { printPrettyCSTML } from '@bablr/helpers/tree';
// import { generateCSTML } from '@bablr/cli/syntax';

import {
  buildBindingTag,
  buildCloseNodeTag,
  buildGapTag,
  buildOpenNodeTag,
  buildReferenceTag,
  buildSpan,
  buildToken,
  evaluateReturnSync,
  nodeFlags,
  printSource,
  printTag,
  sourceTextFor,
  streamFromTree,
  treeFromStreamSync as treeFromStream,
  vcsStreamFromTree,
} from '@bablr/agast-helpers/tree';
import { embeddedSourceFrom } from '@bablr/helpers/source';
import {
  buildAlternative,
  buildAlternatives,
  buildElements,
  buildIdentifier,
  buildPattern,
  buildString,
} from '@bablr/helpers/builders';
import * as Spans from '@bablr/agast-helpers/spans';
import { writeCSTMLStrategy, writePrettyCSTMLStrategy } from '@bablr/agast-vm-helpers/stream';
import { buildNullNode, buildPathSegment, Path, TagPath } from '@bablr/agast-helpers/path';
import { CloseNodeTag, OpenNodeTag } from '@bablr/agast-helpers/symbols';
import { reifyExpression } from '@bablr/agast-vm-helpers';
global.printTag = printTag;

Error.stackTraceLimit = 20;

const content = readFileSync('play/fixture.js', 'utf8');

global.printTree = (tree) => {
  let printed = '';
  let unshift = false;
  let tagPath = TagPath.fromNode(tree, 0);

  let count = 0;

  do {
    if (tagPath.tag.type === CloseNodeTag) count--;

    printed += '\n' + '  '.repeat(count) + printTag(tagPath.tag);

    if (tagPath.tag.type === OpenNodeTag && !tagPath.tag.value.selfClosing) count++;
  } while ((tagPath = unshift ? tagPath.nextUnshifted : tagPath.next));

  return printed;
};

global.printTreeSource = sourceTextFor;

reifyExpression(parse(cstml, 'TreeNode', `<File { isDir: true }> <//> </>`));

// let language = Typescript(language_);

let enhancers = {};

enhancers = {
  ...debugEnhancers,
  // createBablrStrategy: null,
  // bablrProduction: null,
};

let { streamParse, buildTag } = buildModule(enhancers);

const input = readFileSync('play/fixture.js', 'utf8');
// cst.Node({ raw: [input] });

const matcher = m`<$Object />`;
// const input = String`[true, false]`;
// const input = embeddedSourceFrom(`<//> " "`);

let tags = evaluateIO(
  () =>
    // writePrettyCSTMLStrategy(
    streamParse(language, matcher, input, o({}), {
      emitEffects: true,
      spans: Spans.fromValues([buildSpan('Trivia', null, { spaces: 2 }), buildSpan('Bare')]),
      // holdShiftedNodes: true,
      // holdUndefinedAttributes: true,
    }),
  // ),
);

// let tree = evaluateReturnSync(tags);

// let js = buildTag(language, m`<$Program />`, {}, { enhancers });

console.log();
console.log();

// console.log([...streamFromTree(tree, { unshift: true })].map(printTag).join('\n'));

let indent = 0;
for (let tag of tags) {
  if (tag.type === CloseNodeTag) indent--;
  console.log('  '.repeat(indent) + printTag(tag));
  if (tag.type === OpenNodeTag && !tag.value.selfClosing) indent++;
}

// console.log(printPrettyCSTMLStream(tags));
// console.log(printPrettyCSTML(tree));
// console.log(printSource(tree));
// for (let tag of tags) {
//   console.log('\n' + printTag(tag));
// }

// console.log(printPrettyCSTMLStream(tags));
// console.log(printPrettyCSTMLStream(vcsStreamFromTree(tree.node)));

// let stream = [...tags];

// let printedTags = stream.map((tag) => printTag(tag));

// console.log(printPrettyCSTMLStream(stream));
// const tag = buildTag(language, matcher, { enhancers });

// const flags = tag.Flags`i`;
// console.log(printPrettyCSTML(tag`//${flags}`));

// console.log(printPrettyCSTML(tag`[null]`));
