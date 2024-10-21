/* global global, console, URL, globalThis, process */

import { streamParse, Context, AgastContext } from 'bablr/enhanceable';
import { debugEnhancers } from '@bablr/helpers/enhancers';
import { evaluateIO } from '@bablr/io-vm-node';
import * as language from '@bablr/language-en-c-comments';
import { generatePrettyCSTMLStrategy } from '@bablr/helpers/stream';

import { buildFullyQualifiedSpamMatcher } from '@bablr/agast-vm-helpers';

let enhancers = {};

enhancers = { ...debugEnhancers, enhancers };

const input = ` `;

const matcher = buildFullyQualifiedSpamMatcher({}, language.canonicalURL, 'Trivia');
const ctx = Context.from(AgastContext.create(), language, enhancers.bablrProduction);

const tokens = streamParse(ctx, matcher, input, {}, { enhancers, emitEffects: true });

console.log();

evaluateIO(() => generatePrettyCSTMLStrategy(tokens, { ctx, emitEffects: true }));
