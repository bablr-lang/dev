/* global console, URL, globalThis */

import tap from 'iter-tools-es/methods/tap';
import { evaluate as agastEvaluate, Context as AgastContext } from '@bablr/agast-vm';
import { evaluate, Context, Source } from '@bablr/bablr-vm';
import { runSync } from '@bablr/agast-vm-helpers/run';
import { printPrettyCSTML, printTerminal } from '@bablr/agast-helpers/stream';
import { enhanceWithDebugLogging as log } from '@bablr/language_enhancer-debug-log';
import { enhanceStrategyWithDebugLogging as logStrategy } from '@bablr/strategy_enhancer-debug-log';
import { createParseStrategy } from '@bablr/bablr-vm-strategy-parse';

import { sourceText, language, matcher } from './fixture.js';

export { treeFromStreamSync, treeFromStreamAsync } from '@bablr/agast-helpers/tree';

export function streamParse(language, sourceText, matcher, props) {
  const agastCtx = AgastContext.create();
  const ctx = Context.from(agastCtx, language);
  const source = Source.from(sourceText);

  return runSync(
    agastEvaluate(
      agastCtx,
      logStrategy(evaluate(ctx, source, createParseStrategy(matcher, props)), '  '),
    ),
  );
}

console.log();
console.log(`Input: \`${sourceText.replace(/[`\\]/g, '\\$&')}\``);
console.log();

const terminals = streamParse(log(language, '    '), sourceText, matcher);

const printed = printPrettyCSTML(
  tap((terminal) => {
    console.log('>>>', printTerminal(terminal));
  }, terminals),
);

console.log();
console.log(printed);
