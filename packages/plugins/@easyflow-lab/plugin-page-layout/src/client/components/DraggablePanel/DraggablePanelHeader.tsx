import { PanelLeft, Pin, PinOff, PanelRight, PanelBottom, PanelTop } from 'lucide-react';
import React, { memo } from 'react';
import { Flexbox } from 'react-layout-kit';
import { ActionIcon } from '@lobehub/ui';
import { DraggablePanelHeaderProps } from './types';
import useControlledState from 'use-merge-value';
import { usePanelInnerStyles } from './style';

const DraggablePanelHeader = memo<DraggablePanelHeaderProps>((props) => {
  const { pin, setPin, className, setExpand, title, position = 'left', placement, ...rest } = props;
  const { cx, styles } = usePanelInnerStyles();

  const [isPinned, setIsPinned] = useControlledState(false, {
    onChange: setPin,
    value: pin,
  });

  const panelIcon = React.useMemo(() => {
    if (placement === 'right') {
      return <ActionIcon icon={PanelRight} onClick={() => setExpand?.(true)} size={{ blockSize: 24, fontSize: 14 }} />;
    }
    if (placement === 'left') {
      return <ActionIcon icon={PanelLeft} onClick={() => setExpand?.(true)} size={{ blockSize: 24, fontSize: 14 }} />;
    }
    if (placement === 'bottom') {
      return <ActionIcon icon={PanelBottom} onClick={() => setExpand?.(true)} size={{ blockSize: 24, fontSize: 14 }} />;
    }
    if (placement === 'top') {
      return <ActionIcon icon={PanelTop} onClick={() => setExpand?.(true)} size={{ blockSize: 24, fontSize: 14 }} />;
    }
    return null;
  }, [className]);

  const pinIcon = (
    <ActionIcon
      active={pin}
      icon={pin ? Pin : PinOff}
      onClick={() => setIsPinned(!isPinned)}
      size={{ blockSize: 24, fontSize: 14 }}
    />
  );
  return (
    <Flexbox
      align={'center'}
      className={cx(styles.header, className)}
      flex={'none'}
      gap={8}
      horizontal
      justify={'space-between'}
      {...rest}
    >
      {position === 'left' ? panelIcon : pinIcon}
      {title} {className}
      {position === 'left' ? pinIcon : panelIcon}
    </Flexbox>
  );
});

export default DraggablePanelHeader;
