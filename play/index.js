/* global console, URL, globalThis */

import { streamParseSync as streamParse } from 'bablr';
import { printPrettyCSTML } from '@bablr/agast-helpers/stream';
import { enhanceWithDebugLogging as log } from '@bablr/language_enhancer-debug-log';
import indent from 'indent-string';

import { sourceText, language, matcher } from './fixture.js';

console.log(`Input: \`${sourceText.replace(/[`\\]/g, '\\$&')}\``);

const terminals = streamParse(log(language), sourceText, matcher);

const printed = printPrettyCSTML(terminals);

console.log(indent(printed, 4));
