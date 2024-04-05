/* global process */

import ansi from 'ansi';
import { buildSpamMatcher } from '@bablr/agast-vm-helpers/builders';
import * as cstml from '@bablr/language-cstml';
import { streamParseSync as streamParse } from 'bablr/enhanceable';

export const printColorfulCSTML = (printed) => {
  const spamFragment = buildSpamMatcher('Document');

  const output = ansi(process.stdout);

  output.bold().grey();

  let isString = false;

  for (const token of streamParse(cstml, printed, spamFragment)) {
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
