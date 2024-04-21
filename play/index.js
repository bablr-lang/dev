/* global global, console, URL, globalThis, process */

import indent from 'indent-string';
import { streamParse, buildTag } from 'bablr/enhanceable';
import { debugEnhancers } from '@bablr/helpers/enhancers';
import { printPrettyCSTML } from '@bablr/agast-helpers/stream';
import {
  printPrettyCSTML as printPrettyCSTMLFromTree,
  printSource,
} from '@bablr/agast-helpers/tree';

import { sourceText, language, type, props } from './fixture.js';
import { printColorfulCSTML } from './syntax.js';

global.__printSource = printSource;

// console.log();
// console.log(`Input: \`${sourceText.replace(/[`\\]/g, '\\$&')}\``);
// console.log();

const cstml = buildTag(language, 'Expression', props, debugEnhancers);
// const expr = buildTag(language, 'Expression', {}, enhancers);

// const printed = printPrettyCSTML(streamParse(language, type, sourceText, props, enhancers));
// const tree = cstml.Node`<Node></>`;
const tree = cstml`<> ${cstml`<*Word>${cstml`'ok'`}</>`} </>`;
// const tree = cstml`eat(/[ \t\r\n]+/)`;
const printed = printPrettyCSTMLFromTree(tree);

console.log();

// printColorfulCSTML(printed);
printColorfulCSTML(indent(printed, 2));
// console.log(indent(printed, 2));
// console.log(printed);
