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
  - `node scripts/use-https-submodules.js`
- `git submodule update`
- `pnpm i`

Now that you have the code checked out try running a basic example.

- `node play`

Now try editing `play/fixture.js` to parse something different!

### Debugging

Debugging is easiest in VSCode at the moment. You should be able to hit breakpoints defined in any repository.

This works using a custom `postinstall` script which does something like `rm repos/*/node_modules/@bablr`. This allows resolution of in-org dependencies to fall back to what is configured in this `dev` repo. PNPM handles the workspace linking because in `dev` we specify that the versions we depend on are semver `*`. This is a workaround for a limitation of PNPM.

If you need to test a production configuration run `pnpm install --ignore-scripts` to omit the custom linking.
