/* global URL */

export const local = (...args) => new URL(`../../${String.raw(...args)}`, import.meta.url).pathname;
