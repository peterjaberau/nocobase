

import { theme } from 'antd';
import { useDataBlockHeight } from '../../hooks/useBlockSize';
import { useBlockHeightProps } from '../../../block-provider';

export const useAssociationFilterHeight = () => {
  const height = useDataBlockHeight();
  const { token } = theme.useToken();
  const { heightProps } = useBlockHeightProps?.() || {};
  const { title } = heightProps || {};
  const blockTitleHeaderHeight = title ? token.fontSizeLG * token.lineHeightLG + token.padding * 2 - 1 : 0;
  return height - 2 * token.paddingLG - blockTitleHeaderHeight;
};
