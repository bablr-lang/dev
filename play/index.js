/* global console, URL, globalThis, process */

import ansi from 'ansi';
import tap from 'iter-tools-es/methods/tap';
import map from 'iter-tools-es/methods/map';
import { buildFullyQualifiedSpamMatcher } from '@bablr/agast-vm-helpers/builders';
import { evaluate as agastEvaluate, Context as AgastContext } from '@bablr/agast-vm';
import { evaluate, Context, Source } from '@bablr/bablr-vm';
import { streamParse } from 'bablr';
import { runSync } from '@bablr/agast-vm-helpers/run';
import { buildDependentLanguages } from '@bablr/helpers/grammar';
import { printPrettyCSTML, printTerminal } from '@bablr/agast-helpers/stream';
import { enhanceWithDebugLogging as log } from '@bablr/language_enhancer-debug-log';
import { enhanceStrategyWithDebugLogging as logStrategy } from '@bablr/strategy_enhancer-debug-log';
import { createParseStrategy } from '@bablr/bablr-vm-strategy-parse';
import * as cstml from '@bablr/language-cstml';

import { sourceText, language, matcher, props } from './fixture.js';

export { treeFromStreamSync, treeFromStreamAsync } from '@bablr/agast-helpers/tree';

console.log();
console.log(`Input: \`${sourceText.replace(/[`\\]/g, '\\$&')}\``);
console.log();

const agastCtx = AgastContext.create();
const ctx = Context.from(
  agastCtx.facade,
  new Map(
    map(
      ({ 0: url, 1: language }) => ({ 0: url, 1: log(language, '    ') }),
      buildDependentLanguages(language),
    ),
  ),
);
const source = Source.from(sourceText);

const printed = printPrettyCSTML(
  tap(
    (terminal) => console.log(`>>> ${printTerminal(terminal)}`),
    runSync(
      agastEvaluate(
        agastCtx,
        logStrategy(evaluate(ctx, source, createParseStrategy(matcher, props)), '  '),
      ),
    ),
  ),
);

console.log();

const printColorfulCSTML = () => {
  const spamFragment = buildFullyQualifiedSpamMatcher(cstml.canonicalURL, 'Fragment');

  const output = ansi(process.stdout);

  output.red();

  let isString = false;

  for (const token of runSync(streamParse(buildDependentLanguages(cstml), printed, spamFragment))) {
    if (token.type === 'OpenNodeTag') {
      if (token.value.type === 'String') {
        isString = true;
        output.green();
      } else if (!isString) {
        if (['Punctuator', 'Keyword'].includes(token.value.type)) {
          output.red();
        }
      }
    }

    if (token.type === 'CloseNodeTag') {
      if (token.value.type === 'String') {
        isString = false;
      }
      if (!isString) {
        output.reset();
      }
    }

    if (token.type === 'Literal') {
      output.write(token.value);
    }
  }

  output.reset().write('\n');
};

printColorfulCSTML(printed);
