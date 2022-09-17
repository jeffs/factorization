// Functions for creating DOM nodes.

// Returns an Element having the specified tag, properties, and children.  The
// properties and children are optional.
//
// This function is mutually recursive with createAll.
//
// TODO: Accept a component (constructor) instead of a tag.
function create1(tag, propsOrKid = {}, ...kids) {
  const elem = document.createElement(tag);
  if (Array.isArray(propsOrKid)) {
    // The propsOrKid argument is a virtual child.
    elem.append(create1(...propsOrKid));
  } else if (typeof propsOrKid !== 'object' || propsOrKid instanceof Element) {
    // The propsOrKid argument is an actual child.
    elem.append(propsOrKid);
  } else {
    // The propsOrKid argument is a properties object.
    for (const [key, value] of Object.entries(propsOrKid)) {
      if (key === 'style') {
        Object.assign(elem.style, value);
      } else {
        elem[key] = value;
      }
    }
  }
  elem.append(...createAll(...kids));
  return elem;
}

export function clear(parent) {
  while (parent.firstChild) {
    parent.firstChild.remove();
  }
}

// Creates and returns a DOM element per the specified array.  The first item
// in the array must be a tag name.  The second item may optionally be an
// object of properties to set on the element.  Any remaining items (including
// the second, if it is a scalar value or a DOM element) become children of the
// returned element.  Children specified as arrays are converted to DOM
// elements recursively, as though passed directly to this function.
//
// For example:
//
//  const node = elements.create(
//    ['div',
//      ['p', 'Lorem ipsum'],
//      ['button', { disabled: true }, 'Click me'],
//    ]
//  );
export function create(array) {
  return create1(...array);
}

// Creates and returns an element for each arg.
export function createAll(...args) {
  return args.map(a => Array.isArray(a) ? create(a) : a);
}
