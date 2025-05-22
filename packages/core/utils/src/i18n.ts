

import { TFuncKey, TOptions } from 'i18next';

export function tval(text: TFuncKey | TFuncKey[], options?: TOptions) {
  if (options) {
    return `{{t(${JSON.stringify(text)}, ${JSON.stringify(options)})}}`;
  }
  return `{{t(${JSON.stringify(text)})}}`;
}
