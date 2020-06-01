declare global {
  interface Window {
    opera: any;
    chrome: any;
    InstallTrigger: any;
  }
  interface Document {
    documentMode: any;
  }
}

interface Browsers {
  isOpera: boolean;
  isEdge: boolean;
  isChrome: boolean;
  isExplorer: boolean;
  isFirefox: boolean;
  isSafari: boolean;
}

/**
 * Функция определения браузера, с которого запущено приложение
 */
export default function checkBrowser(): Browsers {
  const isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,
    isEdge = navigator.userAgent.indexOf('Edge') > -1,
    isChrome = !!window.chrome && !isOpera && !isEdge,
    isExplorer = typeof document !== 'undefined' && !!document.documentMode && !isEdge,
    isFirefox = typeof window.InstallTrigger !== 'undefined',
    isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  return {
    isOpera,
    isEdge,
    isChrome,
    isExplorer,
    isFirefox,
    isSafari,
  };
}
