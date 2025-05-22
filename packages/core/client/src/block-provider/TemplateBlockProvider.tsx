

import React, { createContext, FC, useCallback, useContext, useMemo, useState } from 'react';

const TemplateBlockContext = createContext<{
  // 模板是否已经请求结束
  templateFinished?: boolean;
  onTemplateSuccess?: Function;
}>({});
TemplateBlockContext.displayName = 'TemplateBlockContext';

/**
 * @internal
 */
export const useTemplateBlockContext = () => {
  return useContext(TemplateBlockContext);
};

const TemplateBlockProvider: FC<{ onTemplateLoaded?: () => void }> = ({ onTemplateLoaded, children }) => {
  const [templateFinished, setTemplateFinished] = useState(false);
  const onTemplateSuccess = useCallback(() => {
    setTemplateFinished(true);

    // Wait for the render to stabilize before invoking onTemplateLoaded, to ensure we can get the latest template schema
    setTimeout(() => {
      onTemplateLoaded?.();
    });
  }, [onTemplateLoaded]);
  const value = useMemo(() => ({ templateFinished, onTemplateSuccess }), [onTemplateSuccess, templateFinished]);
  return <TemplateBlockContext.Provider value={value}>{children}</TemplateBlockContext.Provider>;
};

export { TemplateBlockProvider };
