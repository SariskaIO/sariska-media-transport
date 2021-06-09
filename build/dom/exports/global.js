import jQuery from "../core.js";

(global => {
  if (typeof global.$ === 'undefined') {
    global.$ = jQuery;
  }
})(global || window || this); // eslint-disable-line no-invalid-this