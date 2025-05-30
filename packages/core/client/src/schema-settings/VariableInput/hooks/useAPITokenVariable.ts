

import { useAPIClient } from '../../../api-client/hooks/useAPIClient';
import { useBaseVariable } from './useBaseVariable';

/**
 * 变量：`当前 Token`
 * @param param0
 * @returns
 */
export const useAPITokenVariable = ({
  noDisabled,
}: {
  noDisabled?: boolean;
} = {}) => {
  const apiClient = useAPIClient();
  const apiTokenSettings = useBaseVariable({
    name: '$nToken',
    title: 'API token',
    noDisabled,
    noChildren: true,
  });

  return {
    /** 变量配置项 */
    apiTokenSettings,
    /** 变量的值 */
    apiTokenCtx: apiClient.auth?.token,
  };
};
