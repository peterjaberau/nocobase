import React, { ForwardRefRenderFunction, forwardRef } from 'react';
import { IconHotSpotProps } from './interface';
import { useIconHotSpotStyles } from './style';

const IconHotSpot: ForwardRefRenderFunction<HTMLButtonElement, IconHotSpotProps> = (props, ref) => {
  const { children, iconSize = 16, inactiveColor, activeColor, activeBgColor, type = 'button', ...otherProps } = props;

  const { styles } = useIconHotSpotStyles({
    iconSize,
    activeColor,
    inactiveColor,
    activeBgColor,
  });

  return (
    <button {...otherProps} type={type} className={styles.iconHotSpotContainer} ref={ref}>
      {children}
    </button>
  );
};

export default forwardRef<HTMLButtonElement, IconHotSpotProps>(IconHotSpot);
