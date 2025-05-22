import React, { memo } from 'react';
import { Flexbox } from 'react-layout-kit';
import { DraggablePanelContainerProps } from './types';
import { usePanelInnerStyles } from './style';

const DraggablePanelContainer = memo<DraggablePanelContainerProps>(({ className, ...rest }) => {
  const { cx, styles } = usePanelInnerStyles();
  return <Flexbox className={cx(styles.container, className)} {...rest} />;
});

export default DraggablePanelContainer;
