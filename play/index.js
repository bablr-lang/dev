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
// import * as language from '@bablr/language-es3';
// import * as language from '@bablr/language-cstml';
import * as language from '@bablr/language-regex-vm-pattern';
// import * as language from '@bablr/language-bablr-vm-instruction';

// import { sourceText, language, type, props } from './fixture.js';
import { createPrintCSTMLStrategy } from '@bablr/cli/syntax';

global.__printSource = printSource;

const tag = buildTag(language, 'Pattern', null, debugEnhancers);

// const tokens = [...streamParse(language, 'Fragment', `<><Node></></>`, {}, debugEnhancers)];

const tree = tag`/a+/`;
const tokens = streamFromTree(tree);

console.log();

evaluateIO(createPrintCSTMLStrategy(tokens, { color: false, format: true }), process.stdout);
