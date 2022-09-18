import FactorizationSection from "./components/FactorizationSection.js";
import WasmFactorizationSection from "./components/WasmFactorizationSection.js";
import { create } from "./elements.js";

document.body.append(
  create([
    "main",
    ["h1", "Main"],
    FactorizationSection(),
    WasmFactorizationSection(),
  ])
);
