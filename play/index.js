/* global global, console, URL, globalThis, process */
import { buildTag } from 'bablr';
import { printPrettyCSTML } from '@bablr/agast-helpers/tree';
import { printColorfulCSTML } from './syntax.js';
import {
  enhanceStrategyBuilderWithDebugLogging as logStrategy,
  enhanceStrategyBuilderWithEmittedLogging as logEmitted,
} from '@bablr/strategy_enhancer-debug-log';
import { enhanceProductionWithDebugLogging as createProductionLogger } from '@bablr/language_enhancer-debug-log';
import * as language from '@bablr/language-cstml';

const enhancers = {
  runStrategy: (strategy) => logEmitted(strategy, '>>> '),
  agastStrategy: (strategy) => logStrategy(strategy, '      '),
  bablrProduction: createProductionLogger('    '),
};

const cstml = buildTag(language, 'Expression', {}, enhancers);

const tree = cstml`<> ${cstml`<*Word>${cstml`'ok'`}</>`} </>`;

printColorfulCSTML(printPrettyCSTML(tree));
