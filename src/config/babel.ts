declare global {
  interface Window {
    _babelPolyfill(): any;
  }
}

export default (() => {
  if (!window || !window._babelPolyfill) {
    require('babel-polyfill');
  }
})();
