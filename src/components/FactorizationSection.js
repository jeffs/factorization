import { create } from "../elements.js";

import Mapping from "./Mapping.js";

function renderFactor(factor, power) {
  if (power === 1) {
    return factor;
  }
  const exponent = create(["sup", { className: "margin__outputsup" }, power]);
  return [factor, exponent];
}

function renderFactors(pairs) {
  if (pairs.length === 0) {
    return [];
  }
  const [firstFactor, firstPower] = pairs[0];
  const terms = [renderFactor(firstFactor, firstPower)];
  for (const [factor, power] of pairs.slice(1)) {
    terms.push(" × ", renderFactor(factor, power));
  }
  return terms.flat();
}

export default function FactorizationSection() {
  return Mapping("factorization", {
    title: "Factorization",
    renderValue: renderFactors,
  });
}
