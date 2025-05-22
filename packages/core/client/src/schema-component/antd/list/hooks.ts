

import { SpaceProps, theme } from 'antd';
import { useFieldSchema } from '@formily/react';
import { useDesignable } from '../../../';
import { useListBlockContext } from './List.Decorator';
import { useDataBlockHeight } from '../../hooks/useBlockSize';
import { useBlockHeightProps } from '../../../block-provider/hooks/useBlockHeightProps';

const spaceProps: SpaceProps = {
  size: ['large', 'small'],
  wrap: true,
};

export const useListActionBarProps = () => {
  return {
    spaceProps,
  };
};

export const useListBlockHeight = () => {
  const height = useDataBlockHeight();
  const schema = useFieldSchema();
  const { token } = theme.useToken();
  const { designable } = useDesignable();
  const { heightProps } = useBlockHeightProps() || {};
  const { title, titleHeight } = heightProps || {};
  if (!height) {
    return;
  }
  const blockTitleHeaderHeight = title ? titleHeight : 0;
  const hasListActions = Object.keys(schema.parent.properties.actionBar?.properties || {}).length > 0;
  const actionBarHeight = hasListActions || designable ? token.controlHeight + 2 * token.marginLG : token.marginLG;
  return height - actionBarHeight - token.paddingLG - blockTitleHeaderHeight;
};
