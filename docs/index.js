import FactorizationSection from "./components/FactorizationSection.js";
import WasmFactorizationSection from "./components/WasmFactorizationSection.js";
import { create } from "./elements.js";

const description = `
  This page shows two widgets that show the prime factors of given numbers.
  Each widget delegates the computation to a separate web worker: One worker
  does the computation in JavaScript, and the other in Rust. Aside from the
  Rust worker, the page is pure, unbundled HTML/CSS/JS.`;

document.body.append(
  create([
    "main",
    ["h1", "Factorization"],
    ["p", description],
    FactorizationSection(),
    WasmFactorizationSection(),
  ])
);
