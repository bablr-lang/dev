import { i, re } from '@bablr/boot';
import { buildNumber } from '@bablr/agast-vm-helpers';

import * as Space from '@bablr/language-en-blank-space';

export const dependencies = { Space };

export function* eatMatchTrivia() {
  if (yield i`match(/[ \t\r\n]/)`) {
    return yield i`eat(<#*Space:Space>)`;
  }
  return null;
}

export const grammar = class Markdown {
  constructor() {
    this.covers = new Map();
    this.covers.set(
      Symbol.for('@bablr/node'),
      new Set(['Punctuator', 'Root', 'Paragraph', 'Heading', 'HeadingLevel', 'Literal']),
    );
    this.attributes = this.attributes || new Map();
    this.attributes.set('HeadingLevel', ['depth']);
  }

  *[Symbol.for('@bablr/fragment')]() {
    yield* eatMatchTrivia();
    yield i`eat(<> 'Root')`;
    yield* eatMatchTrivia();
  }

  *Root() {
    yield i`eat(<Any> 'children[]' [
        <Heading /#/>
        <Paragraph /[a-zA-Z]/>
        <#*Space:Space /[ \r\n\t]/>
      ])`;
  }

  *Heading() {
    yield i`eat(<*HeadingLevel> 'level')`;
    yield i`eat(<*Literal /.+/> 'text')`;
  }

  *HeadingLevel() {
    const match = yield i`eatMatch(/#+ /)`;
    if (!match) return;

    const depth = buildNumber(match[0].value.length - 1);
    yield i`bindAttribute('depth' ${depth})`;
  }

  *Paragraph() {
    while (yield i`eatMatch(<*Literal /.+/> 'children[]')`);
  }

  *Punctuator({ intrinsicValue }) {
    if (!intrinsicValue) throw new Error('Intrinsic productions must have value');

    yield i`eat(${intrinsicValue})`;
  }

  *Any({ value: matchers, ctx }) {
    for (const matcher of ctx.unbox(matchers)) {
      if (yield i`eatMatch(${matcher})`) break;
    }
  }
};

export const canonicalURL = 'https://bablr.org/languages/markdown';
