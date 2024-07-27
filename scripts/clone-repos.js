#! /usr/bin/env node

import { simpleGit as buildGitClient } from 'simple-git';

const projectPath = (path = '') => new URL(`../repos/${path}`, import.meta.url);

const gitClient = buildGitClient({ baseDir: projectPath() });
const repos = [
  'git@github.com:bablr-lang/agast-helpers.git',
  'git@github.com:bablr-lang/agast-vm.git',
  'git@github.com:bablr-lang/agast-vm-helpers.git',
  'git@github.com:bablr-lang/io-vm-node.git',
  'git@github.com:bablr-lang/bablr.git',
  'git@github.com:bablr-lang/bablr-cli.git',
  'git@github.com:bablr-lang/bablr-helpers.git',
  'git@github.com:bablr-lang/bablr-vm.git',
  'git@github.com:bablr-lang/bablr-vm-strategy-parse.git',
  'git@github.com:bablr-lang/boot.git',
  'git@github.com:bablr-lang/boot-helpers.git',
  'git@github.com:bablr-lang/coroutine.git',
  'git@github.com:bablr-lang/eslint-config-base.git',
  'git@github.com:bablr-lang/language-en-bablr-cli-verbose-output.git',
  'git@github.com:bablr-lang/language-en-bablr-vm-instruction.git',
  'git@github.com:bablr-lang/language-en-blank-space.git',
  'git@github.com:bablr-lang/language-en-c-comments.git',
  'git@github.com:bablr-lang/language-en-cstml.git',
  'git@github.com:bablr-lang/language-en-json.git',
  'git@github.com:bablr-lang/language-en-regex-vm-pattern.git',
  'git@github.com:bablr-lang/language-en-spamex.git',
  'git@github.com:bablr-lang/language_enhancer-debug-log.git',
  'git@github.com:bablr-lang/macrome.git',
  'git@github.com:bablr-lang/macrome-generator-bablr.git',
  'git@github.com:bablr-lang/paneditor.git',
  'git@github.com:bablr-lang/regex-vm.git',
  'git@github.com:bablr-lang/strategy_enhancer-debug-log.git',
  'git@github.com:bablr-lang/weak-stack.git',
  'git@github.com:bablr-lang/language-uiua.git',
  'git@github.com:bablr-lang/errawr.git',
];

let count = 0;
repos.forEach((repo) => {
  try {
    gitClient.fetch(repo, 'trunk');
    console.log(`cloning ${repo.split(':')[1]} into ${projectPath()}`);
    count++;
  } catch (error) {
    throw new Error(error);
  }
});

console.log(`Successfully cloned ${count} repos`);
