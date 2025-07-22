import { createStyles as antdCreateStyles } from 'antd-style';

// Cache for style elements
const styleElementCache = new Map<string, HTMLStyleElement>();

/**
 * Creates a style element for the given ID if it doesn't exist
 */
function getOrCreateStyleElement(id: string): HTMLStyleElement {
  const styleId = `style-for-${id}`;
  let styleElement = styleElementCache.get(styleId);

  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.setAttribute('type', 'text/css');
    styleElement.setAttribute('id', styleId);
    styleElement.setAttribute('data-style-src', 'eval');
    document.head.appendChild(styleElement);
    styleElementCache.set(styleId, styleElement);
  }

  return styleElement;
}

/**
 * Evaluates and applies CSS rules for a specific element ID
 */
export function evalStyle(id: string, css: string[]): void {
  if (!css.length) return;

  const styleElement = getOrCreateStyleElement(id);
  const cssRules = css
    .filter((rule) => rule.trim())
    .map((rule) => `#${id} { ${rule} }`)
    .join('\n');

  styleElement.textContent = cssRules;
}

/**
 * Clears applied styles
 */
export function clearStyleEval(id?: string): void {
  if (id) {
    const styleId = `style-for-${id}`;
    const styleElement = styleElementCache.get(styleId);
    if (styleElement) {
      styleElement.remove();
      styleElementCache.delete(styleId);
    }
  } else {
    // Remove all eval styles
    document.querySelectorAll('style[data-style-src="eval"]').forEach((element) => {
      element.remove();
    });
    styleElementCache.clear();
  }
}
