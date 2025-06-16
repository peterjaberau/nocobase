import { Tooltip as ChakraTooltip, Portal } from '@chakra-ui/react';
import React from 'react';

export function ToolTip({
  message,
  children,
  placement = 'top',
  delay = { show: 50, hide: 100 },
  show = true,
  tooltipClassName = '',
  ...rest
}) {
  if (!show) return <>{children}</>;

  return (
    <ChakraTooltip.Root placement={placement} openDelay={delay.show} closeDelay={delay.hide} {...rest}>
      <ChakraTooltip.Trigger asChild>{children}</ChakraTooltip.Trigger>
      <Portal>
        <ChakraTooltip.Positioner>
          <ChakraTooltip.Content className={tooltipClassName} style={{ width: rest?.width ?? 'auto' }}>
            {message}
          </ChakraTooltip.Content>
        </ChakraTooltip.Positioner>
      </Portal>
    </ChakraTooltip.Root>
  );
}
