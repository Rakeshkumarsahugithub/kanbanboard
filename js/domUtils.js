export const DOMUtils = {
  createElement(tag, attrs = {}, content = '') {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([key, value]) => {
      if (key === 'dataset') {
        Object.entries(value).forEach(([k, v]) => (el.dataset[k] = v));
      } else {
        el.setAttribute(key, value);
      }
    });
    el.innerHTML = content;
    return el;
  }
};
