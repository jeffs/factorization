import { clear, create } from "../elements.js";

const idCounts = {};

function MappingLabel(text, child) {
  const props = { className: "mapping__label" };
  if (child.id) {
    props.htmlFor = child.id;
  }
  return create(["label", props, `${text}: `, child]);
}

export default function Mapping(topic, options = {}) {
  const title = options.title ?? topic;
  const renderValue =
    options.renderValue ?? ((value) => [JSON.stringify(value)]);
  const renderError =
    options.renderError ?? ((error) => [create(["strong", `error: ${error}`])]);

  // Create an input.
  // Create an output.
  // Start a web worker.
  // Add a worker message listener that renders messages to the output.
  // Add an input event listener that posts messages to the worker.
  // Return a section with the title, labeled input, and labeled output.

  // Give the first mapping of topic "Foo" the ID "Foo", the second "Foo2", etc.
  const idCount = (idCounts[topic] ?? 0) + 1;
  const sectionID = idCount === 1 ? topic : `${topic}${idCount}`;
  idCounts[topic] = idCount;

  const input = create([
    "input",
    { id: `${sectionID}-input`, autofocus: true },
  ]);

  const output = create([
    "output",
    {
      className: "mapping__output",
      id: `${sectionID}-output`,
      htmlFor: input.id,
    },
  ]);

  const worker = new Worker(`workers/${topic}-worker.js`);
  worker.addEventListener("message", (event) => {
    clear(output);
    if (event.data.error) {
      output.classList.add("mapping__output--error");
      output.append(...renderError(event.data.error));
    } else {
      output.classList.remove("mapping__output--error");
      if (event.data.value) {
        output.append(...renderValue(event.data.value));
      }
    }
  });
  input.addEventListener("input", (event) => {
    worker.postMessage(event.target.value);
  });

  return create([
    "section",
    { className: "mapping" },
    ["h2", { className: "mapping__header" }, title],
    MappingLabel("Input", input),
    MappingLabel("Output", output),
  ]);
}
