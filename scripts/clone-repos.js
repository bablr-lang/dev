import { simpleGit as buildGitClient } from 'simple-git';

const projectPath = (path = '') => new URL(`../repos/${path}`, import.meta.url);

const gitClient = buildGitClient({ baseDir: projectPath() });

gitClient.clone('git@github.com:bablr-lang/agast-helpers.git');
gitClient.clone('git@github.com:bablr-lang/agast-vm.git');
gitClient.clone('git@github.com:bablr-lang/agast-vm-helpers.git');
gitClient.clone('git@github.com:bablr-lang/io-vm-code.git');
gitClient.clone('git@github.com:bablr-lang/bablr.git');
gitClient.clone('git@github.com:bablr-lang/bablr-cli.git');
gitClient.clone('git@github.com:bablr-lang/bablr-helpers.git');
gitClient.clone('git@github.com:bablr-lang/bablr-vm.git');
gitClient.clone('git@github.com:bablr-lang/bablr-vm-strategy-parse.git');
gitClient.clone('git@github.com:bablr-lang/boot.git');
gitClient.clone('git@github.com:bablr-lang/boot-helpers.git');
gitClient.clone('git@github.com:bablr-lang/coroutine.git');
gitClient.clone('git@github.com:bablr-lang/eslint-config-base.git');
gitClient.clone('git@github.com:bablr-lang/language-bablr-cli-verbose-output.git');
gitClient.clone('git@github.com:bablr-lang/language-bablr-vm-instruction.git');
gitClient.clone('git@github.com:bablr-lang/language-blank-space.git');
gitClient.clone('git@github.com:bablr-lang/language-c-comments.git');
gitClient.clone('git@github.com:bablr-lang/language-cstml.git');
gitClient.clone('git@github.com:bablr-lang/language-json.git');
gitClient.clone('git@github.com:bablr-lang/language-regex-vm-pattern.git');
gitClient.clone('git@github.com:bablr-lang/language-spamex.git');
gitClient.clone('git@github.com:bablr-lang/language_enhancer-debug-log.git');
gitClient.clone('git@github.com:bablr-lang/macrome.git');
gitClient.clone('git@github.com:bablr-lang/macrome-generator-bablr.git');
gitClient.clone('git@github.com:bablr-lang/regex-vm.git');
gitClient.clone('git@github.com:bablr-lang/strategy_enhancer-debug-log.git');
gitClient.clone('git@github.com:bablr-lang/weak-stack.git');
gitClient.clone('git@github.com:bablr-lang/language-uiua.git');
gitClient.clone('git@github.com:bablr-lang/errawr.git');
