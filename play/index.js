/* global global, console, URL, globalThis, process */

import { streamParse, buildTag, Context, AgastContext } from 'bablr/enhanceable';
import { debugEnhancers } from '@bablr/helpers/enhancers';
import { evaluateIO } from '@bablr/io-vm-node';
// import * as language from '@bablr/language-en-cstml';
import * as language from '@bablr/language-en-json';
import { generatePrettyCSTMLStrategy } from '@bablr/helpers/stream';
import { printPrettyCSTML } from '@bablr/helpers/tree';

import { buildFullyQualifiedSpamMatcher } from '@bablr/agast-vm-helpers';

let enhancers = {};

enhancers = { ...debugEnhancers, enhancers };

const input = `"'"`;

const matcher = buildFullyQualifiedSpamMatcher({}, language.canonicalURL, 'String');
const ctx = Context.from(AgastContext.create(), language, enhancers.bablrProduction);

const tokens = streamParse(ctx, matcher, input, {}, { enhancers, emitEffects: true });

console.log();

evaluateIO(() => generatePrettyCSTMLStrategy(tokens, { ctx, emitEffects: true }));
