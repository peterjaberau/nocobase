

import _ from 'lodash';
import { useEffect, useState } from 'react';

export const parseMarkdown = _.memoize(async (text: string) => {
  if (!text) {
    return text;
  }
  const m = await import('./md');
  return m.default.render(text);
});

export function useParseMarkdown(text: string) {
  const [html, setHtml] = useState<any>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    parseMarkdown(text)
      .then((r) => {
        setHtml(r);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [text]);

  return { html, loading };
}

export function convertToText(markdownText: string) {
  const content = markdownText;
  let temp = document.createElement('div');
  temp.innerHTML = content;
  const text = temp.innerText;
  temp = null;
  return text?.replace(/[\n\r]/g, '') || '';
}
