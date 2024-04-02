/* global global, console, URL, globalThis, process */

import ansi from 'ansi';
import tap from 'iter-tools-es/methods/tap';
import { buildSpamMatcher } from '@bablr/agast-vm-helpers/builders';
import { evaluate as agastEvaluate, Context as AgastContext } from '@bablr/agast-vm';
import { evaluate, Context, Source } from '@bablr/bablr-vm';
import { streamParse } from 'bablr';
import { runSync } from '@bablr/agast-vm-helpers/run';
import { buildDependentLanguages } from '@bablr/helpers/grammar';
import { printPrettyCSTML, printTerminal } from '@bablr/agast-helpers/stream';
import { enhanceStrategyWithDebugLogging as logStrategy } from '@bablr/strategy_enhancer-debug-log';
import { enhanceProductionWithDebugLogging as createProductionLogger } from '@bablr/language_enhancer-debug-log';
import { createParseStrategy } from '@bablr/bablr-vm-strategy-parse';
import { printSource } from '@bablr/agast-helpers/tree';
import * as cstml from '@bablr/language-cstml';

global.__printSource = printSource;

import { sourceText, language, matcher, props } from './fixture.js';

export { treeFromStreamSync, treeFromStreamAsync } from '@bablr/agast-helpers/tree';

console.log();
console.log(`Input: \`${sourceText.replace(/[`\\]/g, '\\$&')}\``);
console.log();

const agastCtx = AgastContext.create();
const ctx = Context.from(agastCtx.facade, buildDependentLanguages(language));
const source = Source.from(sourceText);

const printed = printPrettyCSTML(
  tap(
    (terminal) => console.log(`>>> ${printTerminal(terminal)}`),
    runSync(
      agastEvaluate(
        agastCtx,
        logStrategy(
          evaluate(
            ctx,
            language,
            source,
            createParseStrategy(
              language.canonicalURL,
              matcher,
              props,
              createProductionLogger('    '),
            ),
          ),
          '  ',
        ),
      ),
    ),
  ),
);

console.log();

const printColorfulCSTML = () => {
  const spamFragment = buildSpamMatcher('Document');

  const output = ansi(process.stdout);

  output.bold().grey();

  let isString = false;

  for (const token of runSync(streamParse(cstml, printed, spamFragment))) {
    if (token.type === 'OpenNodeTag') {
      if (token.value.type === 'String') {
        isString = true;
        output.green();
      } else if (!isString) {
        if (['Punctuator', 'Keyword'].includes(token.value.type)) {
          output.bold().grey();
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
// console.log(printed);
