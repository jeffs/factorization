importScripts(`${location.origin}/workers/wasm-factorization.js`);

async function main() {
  await wasm_bindgen();

  addEventListener("message", ({ data }) => {
    const id = data.id;
    const arg = data.arg.trim();
    if (arg.length === 0) {
      postMessage({ id });
      return;
    }

    if (arg.match(/\D/)) {
      postMessage({ id, error: "expected a natural number" });
      return;
    }

    const n = Number(arg);
    if (n > Number.MAX_SAFE_INTEGER) {
      postMessage({ id, error: "that number is too big for me!" });
      return;
    }

    const pairs = [];
    const array = wasm_bindgen.solve(n);
    for (let i = 0; i < array.length; i += 2) {
      pairs.push([array[i], array[i + 1]]);
    }

    postMessage({ id, value: pairs });
  });
}

main();
