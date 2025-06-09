import React from 'react';
import { SimpleGrid, Box, Button, Stack, HStack, Text, Badge, Portal, Dialog, CloseButton } from '@chakra-ui/react';

import { useSelector } from '@xstate/react';
import Card from '../components/product-card-component';
import { rootContext } from '../RootContext';
import { useEffect } from 'react';

const Products = () => {
  const machineParamsRef = rootContext.useActorRef().system.get('currentParams');
  const dataParams = useSelector(machineParamsRef, ({ context }) => context);

  const machineRef = rootContext.useActorRef().system.get('products');

  useEffect(() => {
    console.log(machineRef);

    if (machineRef) {
      machineRef.send({ type: 'SET_CATEGORY_NAME', name: dataParams.category.name });
    }
  }, [machineRef, dataParams.category.name]);

  const { data, state } = useSelector(machineRef, ({ context, value }) => ({
    data: context.products,
    state: value,
  }));

  if (state === 'fetchingProducts' || !data) {
    return <Box>Loading...</Box>;
  }

  return (
    <>
      <Stack >
        {data.map((item) => (
            <Card key={item.id} product={item} />
        ))}
      </Stack>
    </>
  );
};

export default Products;

/*



 <HStack justify={'center'}>
      {data.map((item) => (
        <Link
          key={item.id}
          to={`${item.id}`}
          className="hover:scale-105 transition-transform md:basis-[32%] basis-[90%]"
        >
          <Card product={item} />
        </Link>
      ))}
    </HStack>


 */
