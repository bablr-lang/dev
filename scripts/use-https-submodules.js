#! /usr/bin/env node

import { readFile, readdir, stat } from 'fs/promises';
import { exec } from 'child_process';
import { local } from './utils/path.js';

const useHTTPSRemote = (repo) => {
  const opts = { cwd: local`repos/${repo}` };
  exec('git remote remove origin', opts);
  exec(`git remote add origin https://github.com/bablr-lang/${repo}`, opts);
};

for (const repo of await readdir(local`repos`)) {
  const stats = await stat(local`repos/${repo}`);

  if (!repo.startsWith('.') && stats.isDirectory()) {
    let pkg;

    try {
      pkg = JSON.parse(await readFile(local`repos/${repo}/package.json`, 'utf-8'));
    } catch (e) {}

    if (pkg?.name) {
      useHTTPSRemote(repo);
    }
  }
}
