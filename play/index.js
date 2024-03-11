/* global console, URL, globalThis */

import { streamParseSync as streamParse } from 'bablr';
import { spam } from '@bablr/boot';
import { printPrettyCSTML } from '@bablr/agast-helpers/stream';
import { enhanceWithDebugLogging as log } from '@bablr/language_enhancer-debug-log';
import indent from 'indent-string';
import * as language from '@bablr/language-cstml';

const sourceText = '<></>';
const matcher = spam`<Tree>`;

console.log(`Input: \`${sourceText.replace(/[`\\]/g, '\\$&')}\``);

const terminals = streamParse(log(language), sourceText, matcher);

const printed = printPrettyCSTML(terminals);

console.log(indent(printed, 4));
