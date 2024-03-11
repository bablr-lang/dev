import { simpleGit as buildGitClient } from 'simple-git';

const projectPath = (path = '') => new URL(`../../${path}`, import.meta.url);

const gitClient = buildGitClient({ baseDir: projectPath() });

gitClient.clone('https://github.com/bablr-lang/agast-helpers.git');
gitClient.clone('https://github.com/bablr-lang/agast-vm.git');
gitClient.clone('https://github.com/bablr-lang/agast-vm-helpers.git');
gitClient.clone('https://github.com/bablr-lang/agast-vm-strategy-passthrough.git');
gitClient.clone('https://github.com/bablr-lang/bablr.git');
gitClient.clone('https://github.com/bablr-lang/bablr-helpers.git');
gitClient.clone('https://github.com/bablr-lang/bablr-vm.git');
gitClient.clone('https://github.com/bablr-lang/bablr-vm-strategy-parse.git');
gitClient.clone('https://github.com/bablr-lang/boot.git');
gitClient.clone('https://github.com/bablr-lang/coroutine.git');
gitClient.clone('https://github.com/bablr-lang/dev.git');
gitClient.clone('https://github.com/bablr-lang/eslint-config-base.git');
gitClient.clone('https://github.com/bablr-lang/language-agast-vm-instruction.git');
gitClient.clone('https://github.com/bablr-lang/language-bablr-vm-instruction.git');
gitClient.clone('https://github.com/bablr-lang/language-blank-space.git');
gitClient.clone('https://github.com/bablr-lang/language-c-comments.git');
gitClient.clone('https://github.com/bablr-lang/language-cstml.git');
gitClient.clone('https://github.com/bablr-lang/language-js.git');
gitClient.clone('https://github.com/bablr-lang/language-json.git');
gitClient.clone('https://github.com/bablr-lang/language-regex-vm-pattern.git');
gitClient.clone('https://github.com/bablr-lang/language-spamex.git');
gitClient.clone('https://github.com/bablr-lang/language_enhancer-debug-log.git');
gitClient.clone('https://github.com/bablr-lang/regex-vm.git');
gitClient.clone('https://github.com/bablr-lang/strategy_enhancer-debug-log.git');
gitClient.clone('https://github.com/bablr-lang/test-runner.git');
gitClient.clone('https://github.com/bablr-lang/weak-stack.git');
