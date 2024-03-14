#! /usr/bin/env node

/* global console */

import concat from 'iter-tools-es/methods/concat';
import { readFile, readdir } from 'fs/promises';
import { local } from './utils/path.js';

const repos = {};

for (const repo of await readdir(local`repos`)) {
  let headHash, pkg, dependencies;

  try {
    headHash = (await readFile(local`repos/${repo}/.git/refs/heads/trunk`, 'utf-8')).slice(0, -1);
  } catch (e) {}

  try {
    pkg = JSON.parse(await readFile(local`repos/${repo}/package.json`, 'utf-8'));

    dependencies = {};

    for (const [name, version] of concat(
      Object.entries(pkg.dependencies),
      Object.entries(pkg.devDependencies),
    )) {
      if (/^@?bablr/.test(name)) {
        const result = /github:bablr-lang\/[^#]+#([a-f0-9]+)/.exec(version);
        dependencies[name] = result[1];
      }
    }
  } catch (e) {}

  if (headHash && pkg.name) {
    repos[pkg.name] = {
      headHash,
      dependencies,
    };
  }
}

for (const [name, repo] of Object.entries(repos)) {
  for (const [depName, depHash] of Object.entries(repo.dependencies)) {
    const { headHash } = repos[depName];
    if (headHash !== depHash) {
      console.log(
        `Outdated dependency in ${name}: ${depName}\n  headHash:${headHash}\n  depHash:${depHash}`,
      );
    }
  }
}
