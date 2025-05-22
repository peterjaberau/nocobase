

import { useRequest } from '../../api-client';

export const useRequestSchema = ({
  uid,
  type = 'getJsonSchema',
  onSuccess,
}: {
  uid: string;
  type?: 'getProperties' | 'getJsonSchema';
  onSuccess?: (data: any) => void;
}) => {
  const conf = {
    url: `/uiSchemas:${type}/${uid}`,
  };
  const { data, loading } = useRequest<{
    data: any;
  }>(conf, {
    refreshDeps: [uid],
    onSuccess(data) {
      onSuccess && onSuccess(data);
    },
  });

  return { schema: data?.data, loading };
};
