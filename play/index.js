/* global console, URL, globalThis */

import tap from 'iter-tools-es/methods/tap';
import { evaluate as agastEvaluate, Context as AgastContext } from '@bablr/agast-vm';
import { evaluate, Context, Source } from '@bablr/bablr-vm';
import { runSync } from '@bablr/agast-vm-helpers/run';
import { printPrettyCSTML, printTerminal } from '@bablr/agast-helpers/stream';
import { enhanceWithDebugLogging as log } from '@bablr/language_enhancer-debug-log';
import { enhanceStrategyWithDebugLogging as logStrategy } from '@bablr/strategy_enhancer-debug-log';
import { createParseStrategy } from '@bablr/bablr-vm-strategy-parse';

import { sourceText, language, matcher, props } from './fixture.js';

export { treeFromStreamSync, treeFromStreamAsync } from '@bablr/agast-helpers/tree';

console.log();
console.log(`Input: \`${sourceText.replace(/[`\\]/g, '\\$&')}\``);
console.log();

const agastCtx = AgastContext.create();
const ctx = Context.from(agastCtx.facade, log(language, '    '));
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
console.log(printed);
