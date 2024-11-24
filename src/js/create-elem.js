const createElement = function (tag, className = "", attributes = {}, eventListeners = {}) {
  const element = document.createElement(tag);

  if (className !== "") {
    element.classList.add(...className.split(" "));
  }

  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }

  for (const [type, listener] of Object.entries(eventListeners)) {
    element.addEventListener(type, listener);
  }

  return element;
}

export { createElement }