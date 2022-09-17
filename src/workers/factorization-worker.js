// importScripts doesn't work right with Parcel, because Parcel insists on
// wrapping the imported scripts up as modules, meaning we can't access the
// items they define.  This is despite the docs claiming otherwise:
//
// https://parceljs.org/languages/javascript/#classic-scripts
importScripts(`${location.origin}/workers/lib/factorization.js`);

addEventListener("message", (event) => {
  const data = event.data.trim();
  if (data.length === 0) {
    postMessage({});
  } else if (data.match(/\D/)) {
    postMessage({ error: "expected a natural number" });
  } else {
    postMessage({ value: primeFactor(Number(data) || 1) });
  }
});
