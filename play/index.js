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
import { evaluateIO } from '@bablr/io-vm-node';
import { printPrettyCSTML as printCSTMLStream } from '@bablr/agast-helpers/stream';
import * as language from '@bablr/language-en-c-comments';
import { generatePrettyCSTMLStrategy } from '@bablr/agast-helpers/stream';
// import * as language from '@bablr/language-en-cstml';
// import * as language from '@bablr/language-en-regex-vm-pattern';
// import * as language from '@bablr/language-en-bablr-vm-instruction';
// import * as language from '@bablr/language-en-bablr-cli-verbose-output';

// import { sourceText, language, type, props } from './fixture.js';
// import { createPrintCSTMLStrategy } from '@bablr/cli/syntax';

global.__printSource = printSource;

let enhancers = {};

enhancers = { ...debugEnhancers, enhancers };

// const tag = buildTag(language, 'Pattern', null, debugEnhancers);

const { tokens } = streamParse(
  language,
  'Trivia',
  String.raw` `,
  {},
  { enhancers, emitEffects: true },
);

// const tree = tag`/a+/`;
// const tokens = streamFromTree(tree);

console.log();

evaluateIO(createPrintCSTMLStrategy(tokens, { color: false, format: true, emitEffects: true }));

// evaluateIO(() => generatePrettyCSTMLStrategy(tokens));
