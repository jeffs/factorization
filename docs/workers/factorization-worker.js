// importScripts doesn't work right with Parcel, because Parcel insists on
// wrapping the imported scripts up as modules, meaning we can't access the
// items they define.  This is despite the docs claiming otherwise:
//
// https://parceljs.org/languages/javascript/#classic-scripts
importScripts('./lib/factorization.js');

addEventListener("message", (event) => {
  const id = event.data.id;
  const arg = event.data.arg.trim();
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

  postMessage({ id, value: primeFactor(n || 1) });
});
