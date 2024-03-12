## Getting started developing BABLR

Steps:

- [Intall Node.js](https://nodejs.org/en/download/) (if necessary)
- [Install pnpm](https://pnpm.io/installation) (or your preferred package manager)
- Clone this development repository:
  - SSH: `git clone git@github.com/bablr-lang/dev.git bablr-dev`
  - HTTPS: `git clone https://github.com/bablr-lang/dev.git bablr-dev`
- `cd bablr-dev`
- `git submodule init`
- If you are using HTTPS (for read-only access):
  - `node bablr-dev/scripts/use-https-submodules.js`
- `git submodule update`
- `pnpm i`

Now that you have the code checked out try running a basic example.

- `node play`

Now try editing `play/fixture.js` to parse something different!

### Debugging

Debugging is easiest in VSCode at the moment. Try `pnpm run link-packages` before debugging: it ensures your breakpoints will hit by coercing pnpm to use in-tree source files instead of shipped code.
