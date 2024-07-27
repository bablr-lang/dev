#! /usr/bin/env node

import { simpleGit as buildGitClient } from 'simple-git';

const projectPath = (path = '') => new URL(`../repos/${path}`, import.meta.url);

const gitClient = buildGitClient({ baseDir: projectPath() });

gitClient.fetch('git@github.com:bablr-lang/agast-helpers.git', 'trunk');
gitClient.fetch('git@github.com:bablr-lang/agast-vm.git', 'trunk');
gitClient.fetch('git@github.com:bablr-lang/agast-vm-helpers.git', 'trunk');
gitClient.fetch('git@github.com:bablr-lang/io-vm-code.git', 'trunk');
gitClient.fetch('git@github.com:bablr-lang/bablr.git', 'trunk');
gitClient.fetch('git@github.com:bablr-lang/bablr-cli.git', 'trunk');
gitClient.fetch('git@github.com:bablr-lang/bablr-helpers.git', 'trunk');
gitClient.fetch('git@github.com:bablr-lang/bablr-vm.git', 'trunk');
gitClient.fetch('git@github.com:bablr-lang/bablr-vm-strategy-parse.git', 'trunk');
gitClient.fetch('git@github.com:bablr-lang/boot.git', 'trunk');
gitClient.fetch('git@github.com:bablr-lang/boot-helpers.git', 'trunk');
gitClient.fetch('git@github.com:bablr-lang/coroutine.git', 'trunk');
gitClient.fetch('git@github.com:bablr-lang/eslint-config-base.git', 'trunk');
gitClient.fetch('git@github.com:bablr-lang/language-bablr-cli-verbose-output.git', 'trunk');
gitClient.fetch('git@github.com:bablr-lang/language-bablr-vm-instruction.git', 'trunk');
gitClient.fetch('git@github.com:bablr-lang/language-blank-space.git', 'trunk');
gitClient.fetch('git@github.com:bablr-lang/language-c-comments.git', 'trunk');
gitClient.fetch('git@github.com:bablr-lang/language-cstml.git', 'trunk');
gitClient.fetch('git@github.com:bablr-lang/language-json.git', 'trunk');
gitClient.fetch('git@github.com:bablr-lang/language-regex-vm-pattern.git', 'trunk');
gitClient.fetch('git@github.com:bablr-lang/language-spamex.git', 'trunk');
gitClient.fetch('git@github.com:bablr-lang/language_enhancer-debug-log.git', 'trunk');
gitClient.fetch('git@github.com:bablr-lang/macrome.git', 'trunk');
gitClient.fetch('git@github.com:bablr-lang/macrome-generator-bablr.git', 'trunk');
gitClient.fetch('git@github.com:bablr-lang/regex-vm.git', 'trunk');
gitClient.fetch('git@github.com:bablr-lang/strategy_enhancer-debug-log.git', 'trunk');
gitClient.fetch('git@github.com:bablr-lang/weak-stack.git', 'trunk');
gitClient.fetch('git@github.com:bablr-lang/language-uiua.git', 'trunk');
gitClient.fetch('git@github.com:bablr-lang/errawr.git', 'trunk');
