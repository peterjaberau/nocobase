

import { Card, CardProps } from 'antd';
import React, { useMemo, useRef, useEffect, createContext, useState } from 'react';
import { useToken } from '../../../style';
import { MarkdownReadPretty } from '../markdown';

export const BlockItemCardContext = createContext({});

export const BlockItemCard = React.forwardRef<HTMLDivElement, CardProps | any>(({ children, ...props }, ref) => {
  const { token } = useToken();
  const { title: blockTitle, description, ...others } = props;
  const style = useMemo(() => {
    return { marginBottom: token.marginBlock, height: props.height || '100%' };
  }, [token.marginBlock]);
  const [titleHeight, setTitleHeight] = useState(0);
  const titleRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (titleRef.current) {
        const height = !description
          ? token.fontSizeLG * token.lineHeightLG + token.padding * 2 - 1
          : titleRef.current.parentElement.parentElement.parentElement.offsetHeight;
        setTitleHeight(height);
      } else {
        titleHeight && setTitleHeight(0);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [blockTitle, description]);
  const title = (blockTitle || description) && (
    <div ref={titleRef} style={{ padding: '8px 0px 8px' }}>
      <span>{blockTitle}</span>
      {description && (
        <MarkdownReadPretty
          value={props.description}
          style={{
            overflowWrap: 'break-word',
            whiteSpace: 'normal',
            fontWeight: 400,
            color: token.colorTextDescription,
            borderRadius: '4px',
          }}
        />
      )}
    </div>
  );
  return (
    <BlockItemCardContext.Provider value={{ titleHeight: titleHeight }}>
      <Card ref={ref} bordered={false} style={style} {...others} title={title}>
        {children}
      </Card>
    </BlockItemCardContext.Provider>
  );
});

BlockItemCard.displayName = 'BlockItemCard';
