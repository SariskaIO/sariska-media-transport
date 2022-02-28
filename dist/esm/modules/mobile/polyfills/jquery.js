import jQuery from 'sariska-media-transport/dist/esm/dom/jquery';
(global => {
    if (typeof global.$ === 'undefined') {
        jQuery(global);
        global.$ = jQuery;
    }
})(global || window || this); // eslint-disable-line no-invalid-this
