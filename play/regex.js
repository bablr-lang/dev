/* global global, console, URL, globalThis, process */

import { generateMatches } from '@bablr/regex-vm';

let input = '5'.repeat(20000000);

console.time();

let matches = [];
for (let match of generateMatches(m`/\d+\s+/g`, input)) {
  matches.push([...match[0]]);
}

console.timeEnd();
