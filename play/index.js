/* global global, console, URL, globalThis, process */

import indent from 'indent-string';
import { streamParse, buildTag } from 'bablr/enhanceable';
import { debugEnhancers } from '@bablr/helpers/enhancers';
import { printPrettyCSTML } from '@bablr/agast-helpers/stream';
import {
  printPrettyCSTML as printPrettyCSTMLFromTree,
  printSource,
} from '@bablr/agast-helpers/tree';
// import * as language from '@bablr/language-cstml';
import * as language from '@bablr/language-regex-vm-pattern';

// import { sourceText, language, type, props } from './fixture.js';
import { printColorfulCSTML } from './syntax.js';

global.__printSource = printSource;

// console.log();
// console.log(`Input: \`${sourceText.replace(/[`\\]/g, '\\$&')}\``);
// console.log();

const tag = buildTag(language, 'Pattern', null, debugEnhancers);
// const expr = buildTag(language, 'Expression', {}, enhancers);

// const printed = printPrettyCSTML(streamParse(language, 'Pattern', '/.*/', {}, debugEnhancers));
// const tree = tag.Node`<Node></>`;
const tree = tag`/.*/`;
// const tree = tag`eat(/[ \t\r\n]+/)`;
const printed = printPrettyCSTMLFromTree(tree);

console.log();

printColorfulCSTML(indent(printed, 2));
// console.log(indent(printed, 2));

console.log();
