const fs = require("fs");
const vm = require("vm");

// The following use of vm.runInThisContext is based on work by James Jansson:
// https://github.com/JamesJansson/importScripts/blob/master/importscripts.js
const filename = "factorization.js";
vm.runInThisContext(fs.readFileSync(filename, "utf-8"), filename);

function arraysEqual(xs, ys, itemsEqual = (x, y) => x === y) {
  return xs.length === ys.length && xs.every((x, i) => itemsEqual(x, ys[i]));
}

for (const [arg, want] of [
  [0, []],
  [1, []],
  [2, [[2, 1]]],
  [3, [[3, 1]]],
  [4, [[2, 2]]],
  [
    6,
    [
      [2, 1],
      [3, 1],
    ],
  ],
  [
    18,
    [
      [2, 1],
      [3, 2],
    ],
  ],
]) {
  const got = primeFactor(arg);
  if (!arraysEqual(got, want, arraysEqual)) {
    const g = JSON.stringify(got);
    const w = JSON.stringify(want);
    console.error(`primeFactor(${arg}) returned ${g}; expected ${w}`);
  }
}
