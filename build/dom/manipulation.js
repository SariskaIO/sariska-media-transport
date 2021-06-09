import jQuery from "./core.js";
import access from "./core/access.js";
import "./core/init.js";
jQuery.fn.extend({
  text: function (value) {
    return access(this, function (value) {
      return value === undefined ? jQuery.text(this) : this.empty().each(function () {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          this.textContent = value;
        }
      });
    }, null, value, arguments.length);
  }
});
export default jQuery;