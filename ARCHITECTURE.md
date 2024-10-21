Welcome to the BABLR architecture documentation; if you're here to get an idea of how the BABLR system is designed, read on! I will assume that you are familiar with the Javascript language.

## How BABLR works

BABLR is designed as a virtual machine for executing parsers expressed as plain Javascript generator functions. Here's what that looks like:

```js
import { i } from `@bablr/boot`;

export function *grammar() {
  yield i`eat(/(hello)+/)`;
}
```

There's lots to notice here already!

- Our grammar has no dependency on `bablr` even though `bablr` is a conceptual dependency: some VM will be needed to evaluate this grammar.
- Our grammar is a generator function. You could think of it as being roughly equivalent to `(p) => p.eat('hello')`, but `yield` gives us a great deal more flexibility. Most importantly it lets BABLR consume asyncronous streams of data -- sometimes `yield` will effectively behave like `await`. Unlike `await`, though, `yield` can also return control synchronously which is excellent for perf.
- We use `@bablr/boot` to help us generate valid instructions to be passed to the BABLR VM. Instructions are agAST trees (made up of plain, immutable JS objects, arrays, numbers, and strings). If you haven't actually tried evaulating `` i`eat(/(hello)+/)` `` then you should do so to see what an instruction looks like.

A yielded instruction will pass through many layers of the system. Each layer of the system is expressed as a generator function which evaluates generator functions from the layer below it and yields to the layer above it.

- Higher order functions in grammarspace, such as a trivia enhancer or language logger
- `@bablr/bablr-vm-strategy-parse` (owns the call stack)
- ======= System boundary: internal instruction embedding below here ========
- `@bablr/bablr-vm` (interrogates source and owns language-aware context)
- `@bablr/agast-vm` (owns output data structure)
- ======= System boundary: edge of BABLR ========
- Consumer

Because generators are evaluated lazily in Javascript, this entire system of calling can also be lazy. If the consumer ceases requesting incremental parse results, no more parsing will occur.

## Why

The ultimate goal of BABLR is to create consensus on certain standard which will, in a practical sense, facilitate cooperation and unlock new possibilities. It intends to be a "narrow waist" between language definitions and tool implementations. The argument is that language authors should not have to write large amount of tool code, and tool authors should not have to write large amounts of language-specific code.

Once a certain activation energy is expended, the synergy between language and tool authors should prove self sustaining -- a virtuous cycle. As more languages are defined the value of writing a tool for this platform will grow, and as more tools use these grammars the value of defining your language this way should also grow.

Unfortuantely while the virtuous cycle strategy absolutely can work for us, it also works for our competitors. In order to overcome the momentum of their language ecosystems BABLR needs a steeper growth curve, which in essence means it must be much more attractive to language and tools authors. Its strategies for attaining this include defining languages as as scripts language with no compile step necessary, leading to extraordinarily fast cycle time during language development and the guarnatee that familiar debugging tools will be available and have full visibility

## Immutable objects, WeakMaps, and privacy

agAST tree nodes are deeply immutable trees of objects, arrays, and primitives. Now in JS there is no direct concept of deeply immutable trees, so the first question should be, "If we're going to rely on being able to treat these trees as deeply immutable, how do we know for sure that they are?" It is possible to use `Object.isFrozen` to check if a single node is frozen, but knowing the root node is (shallowly) frozen tells use nothing useful about the condition of an entire tree.

To get around this we use a `WeakMap` which is private to our implementation.

```js
import { traverseProperties } from '@bablr/agast-helpers/tree';

// we can trust this because it is not exported
const safeTrees = new WeakSet();

export const buildNode = (properties) => {
  const node = Object.freeze({ properties });

  for (const child of traverseProperties(properties))
    if (!safeTrees.has(child)) throw new Error();

  safeTrees.add(node);
  return node;
};

export const isTreeFrozen = (node) => {
  return safeTrees.has(node);
};
```

This is important architecturally because it is a general pattern. We can validate larger properties than just that the nodes in the tree are deeply immutable. We can validate that a tree and all its subtrees follow all the rules of agAST, for example. We can also use this mechanism to quickly report on which trees are known to be compliant with a language-specific schema. The only way the implementation will put your tree in that safe-set is if it has actually run the parser to, in essence, validate that the schema rules defined there are being followed

## Data structures

### Stack-trees

BABLR makes heavy use of immutable stacks in its internal implementation. These permit us to hold stacks in our state that can be copied by copying a reference to the top node. This mechanism is crucial to being able to achieve fast state branching, which is necessary to be able to backtrack out of failed `eatMatch`s.

### Btrees

Btree-based lists are used instead of arrays in agAST tree structure. We have a custom btree implementation that structures these trees as nested arrays of arrays, and provides APIs for size and fast indexed access.

Btrees are an optimization to ensure that when agAST trees are used as editor state, the editor does not become unnecessarily slow when working with particularly wide nodes, such as a long passage of plain text or a list with many items. A btree ensures that if we need to edit an immutable list of 1,000,000 items that we don't actually have to reallocated _all_ the memory for the list in order to get a new immutable tree. Instead most of the nodes in the tree can be reused and only those btree nodes on a log-size direct path between the changed leaf and the root will need to be reallocated.

## Stream iterables

BABLR does a LOT of iteration. Iteration is already not the fastest interface in JS, but iteration over asynchronous streams of data has some notably extra-nasty performance pitfalls.

The biggest problem occurs when you attempt to represent the data stream using async iterables. These are consumed with `for await .. of` loops, and the steps of the iterator are always promises. Unfortunately the way the JS language is specified this causes numerous expensive trips to and from the event loop all of which will be unnecessary when the data is loaded synchronously, and the vast majority of which will still be unnecessary even when working with real async data. Not only that, but if you actually use `for await` loops and `async function *` you won't be able to to execute that code from synchronous calling contexts at all.

BABLR solves this problem by inventing a new kind of iterable, which it refers to as a "stream iterable" because it is useful when you're receiving a conceptually unified stream of data in discrete chunks, as you often would in a real data stream.

A stream iterable is basically just a sync iterable that sometimes yields promises. If we don't see a promise, we know it's completely safe for execution to proceed synchronously.

```js
import {
  StreamIterable,
  getStreamIterator,
} from '@bablr/agast-helpers/stream';

function* __transform(stream, fn) {
  let iter = getStreamIterator(
    strategy(facades.get(s), facades.get(ctx)),
  );
  let step = iter.next();

  for (;;) {
    // skipping this block is much faster than a trip to the event loop
    if (step instanceof Promise) {
      step = yield step;
    }

    if (step.done) {
      break;
    }

    const { value } = step;

    // body of implementation goes here
    // if you need to resolve a promise just yield it
    yield fn(value);

    step = iter.next();
  }
}

export const transform = (stream, fn) => {
  // ensures our Promise yield is invisible in the data stream
  return new StreamIterable(__transform(stream, fn));
};

// sync in, sync out. makes life much, much easier when debugging!

[...transform([1, 2, 3], (x) => x++)]; // [2, 3, 4]
```

Note that because `...` invokes `transform[Symbol.iterator]()` any promise yielded during synchronous evaluation would throw an error.

## Gaps and interpolation
