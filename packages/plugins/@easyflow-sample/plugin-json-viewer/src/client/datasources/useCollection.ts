import { useCollection, useDataBlockRequest } from "@easyflow/client";

export function useCollectionFn(props) {

  const collection = useCollection();
  const { data, loading } = useDataBlockRequest<any[]>();

  return {
    collectionName: collection.name,
    data: data?.data,
    loading: loading,
    ...props
  }
}
