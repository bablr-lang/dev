## Getting started developing BABLR

Steps:

- [Intall Node.js](https://nodejs.org/en/download/) (if necessary)
- [Install pnpm](https://pnpm.io/installation) (or your preferred package manager)
- `mkdir bablr-lang` (folder location is unimportant)
- `cd bablr-lang`
- `git clone https://github.com/bablr-lang/dev.git`
- `cd dev`
- `pnpm i`
- `cd ..`
- `node dev/scripts/clone-repos.js`
- `pnpm i`

Now that you have the code checked out try running a basic example.

- `node dev/play`

Now try editing `dev/play/fixture.js` to parse something different!
