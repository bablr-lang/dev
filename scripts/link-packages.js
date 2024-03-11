#! /usr/bin/env node
import { readFile, readdir, stat, unlink } from 'fs/promises';

const local = (...args) => new URL(`../${String.raw(...args)}`, import.meta.url).pathname;

for (const repo of await readdir(local`repos`)) {
  const stats = await stat(local`repos/${repo}`);

  if (!repo.startsWith('.') && stats.isDirectory()) {
    let pkg;

    try {
      pkg = JSON.parse(await readFile(local`repos/${repo}/package.json`));
    } catch (e) {}

    if (pkg?.name) {
      let modules = [];

      try {
        modules = await readdir(local`repos/${repo}/node_modules/@bablr`);
      } catch (e) {}

      for (const module_ of modules) {
        await unlink(local`repos/${repo}/node_modules/@bablr/${module_}`);
      }
    }
  }
}
