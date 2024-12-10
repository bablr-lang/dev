/* global global, console, URL, globalThis, process */

import { streamParse, buildTag, Context, AgastContext } from 'bablr/enhanceable';
import { debugEnhancers } from '@bablr/helpers/enhancers';
import { evaluateIO } from '@bablr/io-vm-node';
import * as language from '@bablr/language-en-cstml';
// import * as language from '@bablr/language-en-regex-vm-pattern';
// import * as language from '@bablr/language-en-json';
import { generatePrettyCSTMLStrategy, printPrettyCSTML } from '@bablr/helpers/stream';

import { buildFullyQualifiedSpamMatcher } from '@bablr/helpers/builders';

let enhancers = {};

enhancers = { ...debugEnhancers, enhancers };

const input = `<Array b={ balancedSpan: "Tag", Balancer: "]" }>`;

const matcher = buildFullyQualifiedSpamMatcher({}, language.canonicalURL, 'OpenNodeTag');
const ctx = Context.from(AgastContext.create(), language, enhancers.bablrProduction);
// const buildCSTMLTag = (type) => {
//   const matcher = buildFullyQualifiedSpamMatcher({}, language.canonicalURL, type);
//   return buildTag(ctx, matcher, undefined, { enhancers });
// };
// const tag = buildCSTMLTag('OpenNodeTag');

// printPrettyCSTML(tag`<Quantifier min=1 max=+Infinity>`, { ctx });
const tags = streamParse(ctx, matcher, input, {}, { enhancers, emitEffects: true });

// console.log();
printPrettyCSTML(
  evaluateIO(() => tags),
  { ctx, emitEffects: true },
);

// evaluateIO(() => generatePrettyCSTMLStrategy(tags, { ctx, emitEffects: true }));
