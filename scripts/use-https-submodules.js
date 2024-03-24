#! /usr/bin/env node

import { readFile, writeFile } from 'fs/promises';
import { exec } from 'child_process';
import { local } from './utils/path.js';

const modulesFileContent = await readFile(local`.gitmodules`, 'utf8');

await writeFile(
  modulesFileContent.replace(/(\s*url\s*=\s*)git@github.com:(.*)/g, '$1https://github.com/$2'),
);

exec('git submodule sync', { cwd: local`` });
