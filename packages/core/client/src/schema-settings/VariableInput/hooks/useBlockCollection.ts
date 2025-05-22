

import { useDataBlockProps } from '../../../data-source/data-block/DataBlockProvider';

export const useBlockCollection = () => {
  const blockProps = useDataBlockProps();
  const name: string = blockProps?.collection || blockProps?.resource;

  return { name };
};
